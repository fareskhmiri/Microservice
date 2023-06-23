import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenComponent } from '@app/core/components/screen/screen/screen.component';
import { HeaderScreenComponent } from '@app/core/components/screen/header-screen/header-screen.component';
import { FooterScreenComponent } from '@app/core/components/screen/footer-screen/footer-screen.component';
import { SharedModule } from '@shared/shared.module';
import { LoadersModule } from '../loaders/loaders.module';
/**
 * Module that exports the main screen, the header and the footer screen components
 * used in the templating of all the `UI Studio` screens store
 */
@NgModule({
  imports: [CommonModule, SharedModule, LoadersModule],
  declarations: [ScreenComponent, HeaderScreenComponent, FooterScreenComponent],
  exports: [ScreenComponent, HeaderScreenComponent, FooterScreenComponent]
})
export class ScreenModule {}
