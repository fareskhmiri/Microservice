import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '@shared/shared.module'
import { CoreComponentsModule } from '@app/core/components/core-components.module'
import { reducers } from './store/reducers'
import { effects } from './store/effects/effects'
import { MessageRoutingModule } from './message-routing.module'
import { CustomMessageModule } from './custom-message.module'
// palmyra-needle-angular-add-module-dependencies-import Do not delete this lone. Palmyra will add service declaration here.
import { MessageMessagelistActionsModule } from '../message/messagelist/actions/message-messagelist-actions.module'

// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { MessageViewMessageComponent } from './view-message/message-view-message.component'

import { MessageMessagelistComponent } from './messagelist/message-messagelist.component'

import { MessageForm1Component } from './form-1/message-form-1.component'

// palmyra-needle-angular-add-facade-import Do not delete this line. Palmyra will add import screen here
// palmyra-needle-angular-add-logic-import Do not delete this line. Palmyra will add import screen here

/**
 * The Message module feature with all its screens
 *
 * @stable
 */
@NgModule({
  imports: [
    CustomMessageModule,
    MessageRoutingModule,
    StoreModule.forFeature('Message', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
    CoreComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    // palmyra-needle-angular-add-module-dependencies-declaration Do not delete this lone. Palmyra will add service declaration here.
    MessageMessagelistActionsModule,
  ],
  providers: [
    // palmyra-needle-angular-add-facade-declaration Do not delete this lone. Palmyra will add service declaration here.
    // palmyra-needle-angular-add-logic-declaration Do not delete this lone. Palmyra will add service declaration here.
  ],
  declarations: [
    // palmyra-needle-angular-add-screen-declaration Do not delete this line. Palmyra will add declaration here
    MessageViewMessageComponent,

    MessageMessagelistComponent,

    MessageForm1Component,
  ],
  exports: [
    // palmyra-needle-angular-add-screen-export Do not delete this line. Palmyra will add exports here
    MessageViewMessageComponent,

    MessageMessagelistComponent,

    MessageForm1Component,
  ],
})
export class MessageModule {}
