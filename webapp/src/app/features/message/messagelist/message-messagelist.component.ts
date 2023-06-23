import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { MessageMessagelistBaseComponent } from './message-messagelist.component-base'
import * as fromMessage from '@features/message/messagelist/store'
/**
 * This component displays a collection of items to manage a master/ details relation.
 * All the logic and interaction with the UI are implemented automatically in the MessageMessagelistBaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-message-messagelist',
  templateUrl: './message-messagelist.component.html',
})
export class MessageMessagelistComponent
  extends MessageMessagelistBaseComponent
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
    super(router, store, activeRoute)
  }
  /**
   * Initialize the component after Angular first displays
   * the data-bound properties and sets the component's input properties
   */
  ngOnInit(): void {
    super.ngOnInit()
  }
}
