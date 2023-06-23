import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '@shared/shared.module'
import { CoreComponentsModule } from '@app/core/components/core-components.module'
import { reducers } from './store/reducers'
import { effects } from './store/effects/effects'
import { DepartementRoutingModule } from './departement-routing.module'
import { CustomDepartementModule } from './custom-departement.module'
// palmyra-needle-angular-add-module-dependencies-import Do not delete this lone. Palmyra will add service declaration here.
import { DepartementSearch1ActionsModule } from '../departement/search-1/actions/departement-search-1-actions.module'

// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { DepartementSearch1Component } from './search-1/departement-search-1.component'

import { DepartementAddDepartmentComponent } from './add-department/departement-add-department.component'

// palmyra-needle-angular-add-facade-import Do not delete this line. Palmyra will add import screen here
// palmyra-needle-angular-add-logic-import Do not delete this line. Palmyra will add import screen here

/**
 * The Departement module feature with all its screens
 *
 * @stable
 */
@NgModule({
  imports: [
    CustomDepartementModule,
    DepartementRoutingModule,
    StoreModule.forFeature('Departement', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
    CoreComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    // palmyra-needle-angular-add-module-dependencies-declaration Do not delete this lone. Palmyra will add service declaration here.
    DepartementSearch1ActionsModule,
  ],
  providers: [
    // palmyra-needle-angular-add-facade-declaration Do not delete this lone. Palmyra will add service declaration here.
    // palmyra-needle-angular-add-logic-declaration Do not delete this lone. Palmyra will add service declaration here.
  ],
  declarations: [
    // palmyra-needle-angular-add-screen-declaration Do not delete this line. Palmyra will add declaration here
    DepartementSearch1Component,

    DepartementAddDepartmentComponent,
  ],
  exports: [
    // palmyra-needle-angular-add-screen-export Do not delete this line. Palmyra will add exports here
    DepartementSearch1Component,

    DepartementAddDepartmentComponent,
  ],
})
export class DepartementModule {}
