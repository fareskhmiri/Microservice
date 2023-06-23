import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { CongeView1BaseComponent } from './conge-view-1.component-base'
import * as fromConge from '@features/conge/view-1/store'
/**
 * This component visualizes an object data., all the logic and interaction with the UI are implemented
 * automatically in the CongeView1BaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-conge-view-1',
  templateUrl: './conge-view-1.component.html',
})
export class CongeView1Component
  extends CongeView1BaseComponent
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
