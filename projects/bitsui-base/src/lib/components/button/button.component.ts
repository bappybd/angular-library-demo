import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';

export enum ButtonType {
  Basic='basic',
  Raised='raised',
  Flat='flat',
  Stroked='stroked',
  Icon='icon'
}

@Component({
  standalone:true,
  selector: 'mat-storybook-button',
  imports: [MatButtonModule, MatIconModule, NgClass, NgIf],
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input()
  buttonType: ButtonType = ButtonType.Raised;

  @Input()
  color = 'primary';

  @Input()
  label = 'Button';

  @Input()
  isDisabled = false;

  /**
   * Optional click handler
   */
  @Output()
  handleClick = new EventEmitter<Event>();

  protected readonly ButtonType = ButtonType;
}
