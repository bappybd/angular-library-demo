import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {FuseProgressBarComponent} from "../lib/components/progress-bar/progress-bar.component";
import {FuseProgressBarModule} from "../lib/components/progress-bar/progress-bar.module";
import {FuseProgressBarService} from "../lib/components/progress-bar/progress-bar.service";
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from "rxjs";

export class MockFuseProgressBarService {
  // Mimic the BehaviorSubject properties
  private _bufferValue = new BehaviorSubject<number>(0);
  private _mode = new BehaviorSubject<string>('indeterminate');
  private _value = new BehaviorSubject<number>(0);
  private _visible = new BehaviorSubject<boolean>(true);

  // Mock observables for public accessors
  bufferValue: Observable<any> = this._bufferValue.asObservable();
  mode: Observable<any> = this._mode.asObservable();
  value: Observable<any> = this._value.asObservable();
  visible: Observable<any> = this._visible.asObservable();

  // Mock methods for public functions
  show(): void {
    this._visible.next(true);
  }

  hide(): void {
    this._visible.next(false);
  }

  // Optionally define methods to control mock behavior
  setValue(value: number): void {
    this._value.next(value); // Example: Allow setting a specific value
  }

  setMode(value: string): void {
    if (['determinate', 'indeterminate', 'buffer', 'query'].includes(value)) {
      this._mode.next(value); // Example: Validate mode input
    } else {
      throw new Error('Invalid mode provided');
    }
  }
}

export default {
  title: 'UI/ProgressBar',
  component: FuseProgressBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FuseProgressBarModule],
      providers: [
        {
          provide: FuseProgressBarService, useClass: MockFuseProgressBarService
        }
      ]
    }),
  ]
} as Meta<FuseProgressBarComponent>;

type Story = StoryObj<FuseProgressBarComponent>;
export const Default: Story = {
  args: {},
};
