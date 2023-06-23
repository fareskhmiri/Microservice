import { Component, Input } from '@angular/core';

/**
 * This is a Generic Component that display a help icon with a tooltip
 * next to an input field's label
 */

@Component({
  selector: 'vp-input-help',
  templateUrl: './input-help.component.html',
})
export class InputHelpComponent {
  @Input() iconClass: string = 'pi pi-question-circle';
  @Input() tooltipText: string;
}
