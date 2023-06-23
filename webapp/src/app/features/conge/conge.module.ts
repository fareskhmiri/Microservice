import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '@shared/shared.module'
import { CoreComponentsModule } from '@app/core/components/core-components.module'
import { reducers } from './store/reducers'
import { effects } from './store/effects/effects'
import { CongeRoutingModule } from './conge-routing.module'
import { CustomCongeModule } from './custom-conge.module'
// palmyra-needle-angular-add-module-dependencies-import Do not delete this lone. Palmyra will add service declaration here.
import { CongeListcongeActionsModule } from '../conge/listconge/actions/conge-listconge-actions.module'

// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { CongeView1Component } from './view-1/conge-view-1.component'

import { CongeListcongeComponent } from './listconge/conge-listconge.component'

import { CongeAddCongeComponent } from './add-conge/conge-add-conge.component'

// palmyra-needle-angular-add-facade-import Do not delete this line. Palmyra will add import screen here
// palmyra-needle-angular-add-logic-import Do not delete this line. Palmyra will add import screen here

/**
 * The Conge module feature with all its screens
 *
 * @stable
 */
@NgModule({
  imports: [
    CustomCongeModule,
    CongeRoutingModule,
    StoreModule.forFeature('Conge', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
    CoreComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    // palmyra-needle-angular-add-module-dependencies-declaration Do not delete this lone. Palmyra will add service declaration here.
    CongeListcongeActionsModule,
  ],
  providers: [
    // palmyra-needle-angular-add-facade-declaration Do not delete this lone. Palmyra will add service declaration here.
    // palmyra-needle-angular-add-logic-declaration Do not delete this lone. Palmyra will add service declaration here.
  ],
  declarations: [
    // palmyra-needle-angular-add-screen-declaration Do not delete this line. Palmyra will add declaration here
    CongeView1Component,

    CongeListcongeComponent,

    CongeAddCongeComponent,
  ],
  exports: [
    // palmyra-needle-angular-add-screen-export Do not delete this line. Palmyra will add exports here
    CongeView1Component,

    CongeListcongeComponent,

    CongeAddCongeComponent,
  ],
})
export class CongeModule {}
