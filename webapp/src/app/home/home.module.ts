import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainRoutingModule } from './home-routing.module'
import { MainComponent } from './home.component'
import { CoreComponentsModule } from '@core/components/core-components.module'

@NgModule({
  imports: [CommonModule, MainRoutingModule, CoreComponentsModule],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
