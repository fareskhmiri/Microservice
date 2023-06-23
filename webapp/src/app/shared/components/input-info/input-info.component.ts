import { Component, Input } from '@angular/core';

/**
 * This is a Generic Component that display info text
 * under an input field
 */

@Component({
  selector: 'vp-input-info',
  templateUrl: './input-info.component.html',
})
export class InputInfoComponent {
  @Input() infoText: string;
}
  