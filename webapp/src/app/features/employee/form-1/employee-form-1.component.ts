import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { EmployeeForm1BaseComponent } from './employee-form-1.component-base'
import * as fromEmployee from '@features/employee/form-1/store'
/**
 * This component displays and manages a Reactive Form logic, all the logic and interaction with the UI are implemented
 * automatically in the EmployeeForm1BaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-employee-form-1',
  templateUrl: './employee-form-1.component.html',
})
export class EmployeeForm1Component
  extends EmployeeForm1BaseComponent
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
