import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { CongeListcongeBaseComponent } from './conge-listconge.component-base'
import * as fromConge from '@features/conge/listconge/store'
/**
 * This component displays a collection of items to manage a master/ details relation.
 * All the logic and interaction with the UI are implemented automatically in the CongeListcongeBaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-conge-listconge',
  templateUrl: './conge-listconge.component.html',
})
export class CongeListcongeComponent
  extends CongeListcongeBaseComponent
  implements OnInit
{
  /**
   * Default Contructor
   */
  constructor(
    router: Router,
    store: Store<fromConge.State>,
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
