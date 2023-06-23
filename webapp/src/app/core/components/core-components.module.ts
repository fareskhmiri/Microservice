import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { LoadersModule } from '@core/components/loaders/loaders.module'
import { DialogsModule } from '@core/components/dialogs/dialogs.module'
import { MessagesModule } from '@core/components/messages/messages.module'
import { Error404Component } from '@core/components/error-404/error-404.component'
import { LanguagesComponent } from '@core/components/languages/languages.component'
import { ExportDataComponent } from '@core/components//export-data/export-data.component'
import { SharedModule } from '@shared/shared.module'
import { UserInfoComponent } from '@app/core/components/user-info/user-info.component'
import { ChangePasswordComponent } from '@app/core/components/change-password/change-password.component'
import { ScreenModule } from '@core/components/screen/screen.module'
import { LayoutsModule } from '@core/components/layouts/layouts.module'
import { LogoComponent } from './logo/logo.component'
import { BrandingComponent } from './branding/branding.component'

@NgModule({
  imports: [
    SharedModule,
    DialogsModule,
    LoadersModule,
    MessagesModule,
    ReactiveFormsModule,
    ScreenModule,
    LayoutsModule,
  ],
  exports: [
    LoadersModule,
    SharedModule,
    Error404Component,
    LogoComponent,
    MessagesModule,
    LanguagesComponent,
    ExportDataComponent,
    ChangePasswordComponent,
    UserInfoComponent,
    ScreenModule,
    BrandingComponent,

    LayoutsModule,
  ],
  declarations: [
    Error404Component,
    LanguagesComponent,
    ExportDataComponent,
    ChangePasswordComponent,
    UserInfoComponent,

    LogoComponent,
    BrandingComponent,
  ],
  providers: [],
})
export class CoreComponentsModule {}
