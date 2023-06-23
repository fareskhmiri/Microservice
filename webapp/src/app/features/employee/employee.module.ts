import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '@shared/shared.module'
import { CoreComponentsModule } from '@app/core/components/core-components.module'
import { reducers } from './store/reducers'
import { effects } from './store/effects/effects'
import { EmployeeRoutingModule } from './employee-routing.module'
import { CustomEmployeeModule } from './custom-employee.module'
// palmyra-needle-angular-add-module-dependencies-import Do not delete this lone. Palmyra will add service declaration here.
import { EmployeeSearch1ActionsModule } from '../employee/search-1/actions/employee-search-1-actions.module'

// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { EmployeeSearch1Component } from './search-1/employee-search-1.component'

import { EmployeeForm1Component } from './form-1/employee-form-1.component'

// palmyra-needle-angular-add-facade-import Do not delete this line. Palmyra will add import screen here
// palmyra-needle-angular-add-logic-import Do not delete this line. Palmyra will add import screen here

/**
 * The Employee module feature with all its screens
 *
 * @stable
 */
@NgModule({
  imports: [
    CustomEmployeeModule,
    EmployeeRoutingModule,
    StoreModule.forFeature('Employee', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
    CoreComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    // palmyra-needle-angular-add-module-dependencies-declaration Do not delete this lone. Palmyra will add service declaration here.
    EmployeeSearch1ActionsModule,
  ],
  providers: [
    // palmyra-needle-angular-add-facade-declaration Do not delete this lone. Palmyra will add service declaration here.
    // palmyra-needle-angular-add-logic-declaration Do not delete this lone. Palmyra will add service declaration here.
  ],
  declarations: [
    // palmyra-needle-angular-add-screen-declaration Do not delete this line. Palmyra will add declaration here
    EmployeeSearch1Component,

    EmployeeForm1Component,
  ],
  exports: [
    // palmyra-needle-angular-add-screen-export Do not delete this line. Palmyra will add exports here
    EmployeeSearch1Component,

    EmployeeForm1Component,
  ],
})
export class EmployeeModule {}
