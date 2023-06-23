import { Component } from '@angular/core'
/**
 * Main feature component that handles the routing of all the available features
 */
@Component({
  template: ` <router-outlet class="feature"></router-outlet> `,
})
export class MainComponent {
  constructor() {}
}
