import {
    Directive,
    Input,
    OnInit,
    HostListener,
    OnDestroy,
    HostBinding,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { MediaObserver } from "@angular/flex-layout";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { FuseMatchMediaService } from "../../services/match-media.service";
import { FuseMatSidenavHelperService } from "./fuse-mat-sidenav.service";

@Directive({
    selector: "[fuseMatSidenavHelper]",
})
export class FuseMatSidenavHelperDirective implements OnInit, OnDestroy {
    @HostBinding("class.mat-is-locked-open")
    isLockedOpen: boolean;

    @Input()
    fuseMatSidenavHelper: number = 0;

    @Input()
    matIsLockedOpen: string = '';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _mediaObserver
     */
    constructor(
        private _fuseMatchMediaService: FuseMatchMediaService,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        private _matSidenav: MatSidenav,
        private _mediaObserver: MediaObserver
    ) {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Register the sidenav to the service
        this._fuseMatSidenavHelperService.setSidenav(
            this.fuseMatSidenavHelper,
            this._matSidenav
        );

        if (
            this.matIsLockedOpen &&
            this._mediaObserver.isActive(this.matIsLockedOpen)
        ) {
            this.isLockedOpen = true;
            this._matSidenav.mode = "side";
            this._matSidenav.toggle(true);
        } else {
            this.isLockedOpen = false;
            this._matSidenav.mode = "over";
            this._matSidenav.toggle(false);
        }

        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if (
                    this.matIsLockedOpen &&
                    this._mediaObserver.isActive(this.matIsLockedOpen)
                ) {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = "side";
                    this._matSidenav.toggle(true);
                } else {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = "over";
                    this._matSidenav.toggle(false);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(0);
        this._unsubscribeAll.complete();
    }
}

@Directive({
    selector: "[fuseMatSidenavToggler]",
})
export class FuseMatSidenavTogglerDirective {
    @Input()
    fuseMatSidenavToggler: number = 0;

    /**
     * Constructor
     *
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     */
    constructor(
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener("click")
    onClick(): void {
        this._fuseMatSidenavHelperService
            .getSidenav(this.fuseMatSidenavToggler)
            .toggle();
    }
}
