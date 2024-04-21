import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '../../services/config.service';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ButtonComponent, ButtonType} from "../button/button.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
    selector: 'fuse-search-bar',
    standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    ButtonComponent
  ],
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class FuseSearchBarComponent implements OnInit, OnDestroy {
    @Input()
    collapsed = false;
    fuseConfig: any;

    @Output()
    inputEventEmitter: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService
    ) {
        // Set the defaults
        this.inputEventEmitter = new EventEmitter();
        // this.collapsed = true;

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
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config: any) => {
                    this.fuseConfig = config;
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(0);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Collapse
     */
    collapse(): void {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void {
        this.collapsed = false;
    }

    /**
     * Search
     *
     * @param event
     */
    search(event: any): void {
        this.inputEventEmitter.emit(event?.target?.value);
    }

    protected readonly ButtonType = ButtonType;
}
