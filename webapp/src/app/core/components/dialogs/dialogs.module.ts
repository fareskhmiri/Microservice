import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog/dialog.component';
import { SharedModule } from '@shared/shared.module';
/**
 * Module that exports the dialog component
 */
@NgModule({
  imports: [SharedModule],
  declarations: [
    DialogComponent
  ]
})
export class DialogsModule {}
