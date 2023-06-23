import { NgModule } from '@angular/core';


import { MessageComponent } from '@core/components/messages/message/message.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  exports: [MessageComponent],
  declarations: [MessageComponent]
})
export class MessagesModule { }
