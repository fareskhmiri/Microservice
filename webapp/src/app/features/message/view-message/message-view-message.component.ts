import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { MessageViewMessageBaseComponent } from './message-view-message.component-base'
import * as fromMessage from '@features/message/view-message/store'
/**
 * This component visualizes an object data., all the logic and interaction with the UI are implemented
 * automatically in the MessageViewMessageBaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-message-view-message',
  templateUrl: './message-view-message.component.html',
})
export class MessageViewMessageComponent
  extends MessageViewMessageBaseComponent
  implements OnInit
{
  /**
   * Default Contructor
   */
  constructor(
    router: Router,
    store: Store<fromMessage.State>,
    activeRoute: ActivatedRoute
  ) {
    super(router, activeRoute, store)
  }
  /**
   * Initialize the component after Angular first displays
   * the data-bound properties and sets the component's input properties
   */
  ngOnInit(): void {
    super.ngOnInit()
  }
}
