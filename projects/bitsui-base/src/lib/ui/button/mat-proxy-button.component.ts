import { Component, Input } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
@Component({
  standalone:true,
  selector: 'mat-storybook-button',
  imports: [MatButtonModule],
  template: `<button mat-flat-button [color]="color" [disabled]="isDisabled">Basic</button>`,
})
export default class MatProxyButtonComponent {
  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  color = 'primary';

  @Input()
  isDisabled = false;
}
