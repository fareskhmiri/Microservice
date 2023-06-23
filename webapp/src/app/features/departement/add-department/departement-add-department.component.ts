import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { DepartementAddDepartmentBaseComponent } from './departement-add-department.component-base'
import * as fromDepartement from '@features/departement/add-department/store'
/**
 * This component displays and manages a Reactive Form logic, all the logic and interaction with the UI are implemented
 * automatically in the DepartementAddDepartmentBaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-departement-add-department',
  templateUrl: './departement-add-department.component.html',
})
export class DepartementAddDepartmentComponent
  extends DepartementAddDepartmentBaseComponent
  implements OnInit
{
  /**
   * Default Contructor
   */
  constructor(
    router: Router,
    store: Store<fromDepartement.State>,
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
