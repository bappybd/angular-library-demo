import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewEncapsulation,
} from "@angular/core";
import {
    animate,
    AnimationBuilder,
    AnimationPlayer,
    style,
} from "@angular/animations";
import { MediaObserver } from "@angular/flex-layout";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { FuseSidebarService } from "./sidebar.service";
import { FuseMatchMediaService } from "../../services/match-media.service";
import { FuseConfigService } from "../../services/config.service";

@Component({
    selector: "fuse-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class FuseSidebarComponent implements OnInit, OnDestroy {
    // Name
    @Input()
    name: string = '';

    // Key
    @Input()
    key: string = '';

    // Position
    @Input()
    position: "left" | "right";

    // Open
    @HostBinding("class.open")
    opened: boolean;

    // Locked Open
    @Input()
    lockedOpen: string = '';

    // isLockedOpen
    @HostBinding("class.locked-open")
    isLockedOpen: boolean = false;

    // Folded width
    @Input()
    foldedWidth: number;

    // Folded auto trigger on hover
    @Input()
    foldedAutoTriggerOnHover: boolean;

    // Folded unfolded
    @HostBinding("class.unfolded")
    unfolded: boolean = false;

    // Invisible overlay
    @Input()
    invisibleOverlay: boolean;

    // Folded changed
    @Output()
    foldedChanged: EventEmitter<boolean>;

    // Opened changed
    @Output()
    openedChanged: EventEmitter<boolean>;

    // public
    public _folded: boolean;
    public _fuseConfig: any;
    public _wasActive: boolean = false;
    public _wasFolded: boolean = false;
    public _backdrop: HTMLElement | null = null;
    public _player: AnimationPlayer | null = null;
    public _unsubscribeAll: Subject<any>;

    @HostBinding("class.animations-enabled")
    public _animationsEnabled: boolean;

    /**
     * Constructor
     *
     * @param {AnimationBuilder} _animationBuilder
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {ElementRef} _elementRef
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    constructor(
        public _animationBuilder: AnimationBuilder,
        public _changeDetectorRef: ChangeDetectorRef,
        public _elementRef: ElementRef,
        public _fuseConfigService: FuseConfigService,
        public _fuseMatchMediaService: FuseMatchMediaService,
        public _fuseSidebarService: FuseSidebarService,
        public _mediaObserver: MediaObserver,
        public _renderer: Renderer2
    ) {
        // Set the defaults
        this.foldedAutoTriggerOnHover = true;
        this.foldedWidth = 64;
        this.foldedChanged = new EventEmitter();
        this.openedChanged = new EventEmitter();
        this.opened = false;
        this.position = "left";
        this.invisibleOverlay = false;

        // Set the public defaults
        this._animationsEnabled = false;
        this._folded = false;
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Folded
     *
     * @param {boolean} value
     */
    @Input()
    set folded(value: boolean) {
        // Set the folded
        this._folded = value;

        // Return if the sidebar is closed
        if (!this.opened) {
            return;
        }

        // Programmatically add/remove padding to the element
        // that comes after or before based on the position
        let sibling, styleRule;

        const styleValue = this.foldedWidth + "px";

        // Get the sibling and set the style rule
        if (this.position === "left") {
            sibling = this._elementRef.nativeElement.nextElementSibling;
            styleRule = "padding-left";
        } else {
            sibling = this._elementRef.nativeElement.previousElementSibling;
            styleRule = "padding-right";
        }

        // If there is no sibling, return...
        if (!sibling) {
            return;
        }

        // If folded...
        if (value) {
            // Fold the sidebar
            this.fold();

            // Set the folded width
            this._renderer.setStyle(
                this._elementRef.nativeElement,
                "width",
                styleValue
            );
            this._renderer.setStyle(
                this._elementRef.nativeElement,
                "min-width",
                styleValue
            );
            this._renderer.setStyle(
                this._elementRef.nativeElement,
                "max-width",
                styleValue
            );

            // Set the style and class
            this._renderer.setStyle(sibling, styleRule, styleValue);
            this._renderer.addClass(this._elementRef.nativeElement, "folded");
        }
        // If unfolded...
        else {
            // Unfold the sidebar
            this.unfold();

            // Remove the folded width
            this._renderer.removeStyle(this._elementRef.nativeElement, "width");
            this._renderer.removeStyle(
                this._elementRef.nativeElement,
                "min-width"
            );
            this._renderer.removeStyle(
                this._elementRef.nativeElement,
                "max-width"
            );

            // Remove the style and class
            this._renderer.removeStyle(sibling, styleRule);
            this._renderer.removeClass(
                this._elementRef.nativeElement,
                "folded"
            );
        }

        // Emit the 'foldedChanged' event
        this.foldedChanged.emit(this.folded);
    }

    get folded(): boolean {
        return this._folded;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: any) => {
                this._fuseConfig = config;
            });

        // Register the sidebar
        this._fuseSidebarService.register(this.name, this);

        // Setup visibility
        this._setupVisibility();

        // Setup position
        this._setupPosition();

        // Setup lockedOpen
        this._setupLockedOpen();

        // Setup folded
        this._setupFolded();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // If the sidebar is folded, unfold it to revert modifications
        if (this.folded) {
            this.unfold();
        }

        // Unregister the sidebar
        this._fuseSidebarService.unregister(this.name);

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(0);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setup the visibility of the sidebar
     *
     * @public
     */
    public _setupVisibility(): void {
        // Remove the existing box-shadow
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "box-shadow",
            "none"
        );

        // Make the sidebar invisible
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "visibility",
            "hidden"
        );
    }

    /**
     * Setup the sidebar position
     *
     * @public
     */
    public _setupPosition(): void {
        // Add the correct class name to the sidebar
        // element depending on the position attribute
        if (this.position === "right") {
            this._renderer.addClass(
                this._elementRef.nativeElement,
                "right-positioned"
            );
        } else {
            this._renderer.addClass(
                this._elementRef.nativeElement,
                "left-positioned"
            );
        }
    }

    /**
     * Setup the lockedOpen handler
     *
     * @public
     */
    public _setupLockedOpen(): void {
        // Return if the lockedOpen wasn't set
        if (!this.lockedOpen) {
            // Return
            return;
        }

        // Set the wasActive for the first time
        this._wasActive = false;

        // Set the wasFolded
        this._wasFolded = this.folded;

        // Show the sidebar
        this._showSidebar();

        // Act on every media change
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Get the active status
                const isActive = this._mediaObserver.isActive(this.lockedOpen);

                // If the both status are the same, don't act
                if (this._wasActive === isActive) {
                    return;
                }

                // Activate the lockedOpen
                if (isActive) {
                    // Set the lockedOpen status
                    this.isLockedOpen = true;

                    // Show the sidebar
                    this._showSidebar();

                    // Force the the opened status to true
                    this.opened = true;

                    // Emit the 'openedChanged' event
                    this.openedChanged.emit(this.opened);

                    // If the sidebar was folded, forcefully fold it again
                    if (this._wasFolded) {
                        // Enable the animations
                        this._enableAnimations();

                        // Fold
                        this.folded = true;

                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    }

                    // Hide the backdrop if any exists
                    this._hideBackdrop();
                }
                // De-Activate the lockedOpen
                else {
                    // Set the lockedOpen status
                    this.isLockedOpen = false;

                    // Unfold the sidebar in case if it was folded
                    this.unfold();

                    // Force the the opened status to close
                    this.opened = false;

                    // Emit the 'openedChanged' event
                    this.openedChanged.emit(this.opened);

                    // Hide the sidebar
                    this._hideSidebar();
                }

                // Store the new active status
                this._wasActive = isActive;
            });
    }

    /**
     * Setup the initial folded status
     *
     * @public
     */
    public _setupFolded(): void {
        // Return, if sidebar is not folded
        if (!this.folded) {
            return;
        }

        // Return if the sidebar is closed
        if (!this.opened) {
            return;
        }

        // Programmatically add/remove padding to the element
        // that comes after or before based on the position
        let sibling, styleRule;

        const styleValue = this.foldedWidth + "px";

        // Get the sibling and set the style rule
        if (this.position === "left") {
            sibling = this._elementRef.nativeElement.nextElementSibling;
            styleRule = "padding-left";
        } else {
            sibling = this._elementRef.nativeElement.previousElementSibling;
            styleRule = "padding-right";
        }

        // If there is no sibling, return...
        if (!sibling) {
            return;
        }

        // Fold the sidebar
        this.fold();

        // Set the folded width
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "width",
            styleValue
        );
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "min-width",
            styleValue
        );
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "max-width",
            styleValue
        );

        // Set the style and class
        this._renderer.setStyle(sibling, styleRule, styleValue);
        this._renderer.addClass(this._elementRef.nativeElement, "folded");
    }

    /**
     * Show the backdrop
     *
     * @public
     */
    public _showBackdrop(): void {
        // Create the backdrop element
        this._backdrop = this._renderer.createElement("div");

        // Add a class to the backdrop element
        this._backdrop?.classList.add("fuse-sidebar-overlay");

        // Add a class depending on the invisibleOverlay option
        if (this.invisibleOverlay) {
            this._backdrop?.classList.add("fuse-sidebar-overlay-invisible");
        }

        // Append the backdrop to the parent of the sidebar
        this._renderer.appendChild(
            this._elementRef.nativeElement.parentElement,
            this._backdrop
        );

        // Create the enter animation and attach it to the player
        this._player = this._animationBuilder
            .build([animate("300ms ease", style({ opacity: 1 }))])
            .create(this._backdrop);

        // Play the animation
        this._player.play();

        // Add an event listener to the overlay
        this._backdrop?.addEventListener("click", () => {
            this.close();
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Hide the backdrop
     *
     * @public
     */
    public _hideBackdrop(): void {
        if (!this._backdrop) {
            return;
        }

        // Create the leave animation and attach it to the player
        this._player = this._animationBuilder
            .build([animate("300ms ease", style({ opacity: 0 }))])
            .create(this._backdrop);

        // Play the animation
        this._player.play();

        // Once the animation is done...
        this._player.onDone(() => {
            // If the backdrop still exists...
            if (this._backdrop) {
                // Remove the backdrop
                this._backdrop?.parentNode?.removeChild(this._backdrop);
                this._backdrop = null;
            }
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Change some properties of the sidebar
     * and make it visible
     *
     * @public
     */
    public _showSidebar(): void {
        // Remove the box-shadow style
        this._renderer.removeStyle(
            this._elementRef.nativeElement,
            "box-shadow"
        );

        // Make the sidebar invisible
        this._renderer.removeStyle(
            this._elementRef.nativeElement,
            "visibility"
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Change some properties of the sidebar
     * and make it invisible
     *
     * @public
     */
    public _hideSidebar(delay = true): void {
        const delayAmount = delay ? 300 : 0;

        // Add a delay so close animation can play
        setTimeout(() => {
            // Remove the box-shadow
            this._renderer.setStyle(
                this._elementRef.nativeElement,
                "box-shadow",
                "none"
            );

            // Make the sidebar invisible
            this._renderer.setStyle(
                this._elementRef.nativeElement,
                "visibility",
                "hidden"
            );
        }, delayAmount);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Enable the animations
     *
     * @public
     */
    public _enableAnimations(): void {
        // Return if animations already enabled
        if (this._animationsEnabled) {
            return;
        }

        // Enable the animations
        this._animationsEnabled = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the sidebar
     */
    open(): void {
        if (this.opened || this.isLockedOpen) {
            return;
        }

        // Enable the animations
        this._enableAnimations();

        // Show the sidebar
        this._showSidebar();

        // Show the backdrop
        this._showBackdrop();

        // Set the opened status
        this.opened = true;

        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Close the sidebar
     */
    close(): void {
        if (!this.opened || this.isLockedOpen) {
            return;
        }

        // Enable the animations
        this._enableAnimations();

        // Hide the backdrop
        this._hideBackdrop();

        // Set the opened status
        this.opened = false;

        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);

        // Hide the sidebar
        this._hideSidebar();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle open/close the sidebar
     */
    toggleOpen(): void {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Mouseenter
     */
    @HostListener("mouseenter")
    onMouseEnter(): void {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }

        this.unfoldTemporarily();
    }

    /**
     * Mouseleave
     */
    @HostListener("mouseleave")
    onMouseLeave(): void {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }

        this.foldTemporarily();
    }

    /**
     * Fold the sidebar permanently
     */
    fold(): void {
        // Only work if the sidebar is not folded
        if (this.folded) {
            return;
        }

        // Enable the animations
        this._enableAnimations();

        // Fold
        this.folded = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Unfold the sidebar permanently
     */
    unfold(): void {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }

        // Enable the animations
        this._enableAnimations();

        // Unfold
        this.folded = false;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar fold/unfold permanently
     */
    toggleFold(): void {
        if (this.folded) {
            this.unfold();
        } else {
            this.fold();
        }
    }

    /**
     * Fold the temporarily unfolded sidebar back
     */
    foldTemporarily(): void {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }

        // Enable the animations
        this._enableAnimations();

        // Fold the sidebar back
        this.unfolded = false;

        // Set the folded width
        const styleValue = this.foldedWidth + "px";

        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "width",
            styleValue
        );
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "min-width",
            styleValue
        );
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            "max-width",
            styleValue
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Unfold the sidebar temporarily
     */
    unfoldTemporarily(): void {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }

        // Enable the animations
        this._enableAnimations();

        // Unfold the sidebar temporarily
        this.unfolded = true;

        // Remove the folded width
        this._renderer.removeStyle(this._elementRef.nativeElement, "width");
        this._renderer.removeStyle(this._elementRef.nativeElement, "min-width");
        this._renderer.removeStyle(this._elementRef.nativeElement, "max-width");

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
