import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { EmployeeSearch1BaseComponent } from './employee-search-1.component-base'
import * as fromEmployee from '@features/employee/search-1/store'
/**
 * This component displays a collection of items to manage a master/ details relation.
 * All the logic and interaction with the UI are implemented automatically in the EmployeeSearch1BaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-employee-search-1',
  templateUrl: './employee-search-1.component.html',
})
export class EmployeeSearch1Component
  extends EmployeeSearch1BaseComponent
  implements OnInit
{
  /**
   * Default Contructor
   */
  constructor(
    router: Router,
    store: Store<fromEmployee.State>,
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
