import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ConfirmationService } from 'primeng/api'

import { SharedModule } from '@shared/shared.module'
import { FeaturesRoutingModule } from './features-routing.module'
import { MainComponent } from './main/main.component'
import { CoreComponentsModule } from '@app/core/components/core-components.module'
import { CustomFeaturesModule } from './custom-features.module'
/**
 * The main module of all the available features modules
 *
 * @stable
 */
@NgModule({
  imports: [
    FeaturesRoutingModule,
    RouterModule,
    SharedModule,
    CoreComponentsModule,
    CustomFeaturesModule,
  ],
  declarations: [MainComponent],
  providers: [ConfirmationService],
})
export class FeaturesModule {}
