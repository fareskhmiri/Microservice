import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { BodyComponent } from '@core/components/layouts/body/body.component';
import { FooterComponent } from '@core/components/layouts/footer/footer.component';
import { HeaderComponent } from '@core/components/layouts/header/header.component';

@NgModule({
  imports: [SharedModule],
  exports: [BodyComponent, FooterComponent, HeaderComponent],
  declarations: [BodyComponent, FooterComponent, HeaderComponent]
})
export class LayoutsModule {}
