import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CoreComponentsModule } from '@core/components/core-components.module'
import { AppUtility } from '@core/utils/app.utility'
import { CoreServicesModule } from '@services/core-services.module'
import { SharedModule } from '@shared/shared.module'
import { MainModule } from '@app/home/home.module'
import { CustomCoreModule } from '@core/custom-core.module'

/**
 *
 * The core module which provides singleton services for the whole application
 *
 * @stable
 */
@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    CoreComponentsModule,
    CoreServicesModule,
    SharedModule,
    MainModule,
    CustomCoreModule,
  ],
  declarations: [],
  providers: [AppUtility],
  exports: [MainModule, CoreComponentsModule, CustomCoreModule],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    private appUtility: AppUtility
  ) {
    this.appUtility.throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
