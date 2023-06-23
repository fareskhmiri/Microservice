import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ScreenDialogComponent } from '@shared/components/screen-dialog/screen-dialog.component'
import { AuthGuardService } from '@app/core/services/auth-guard/auth-guard.service'
import { customRoutes } from './custom-message-routing.module'
// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { MessageViewMessageComponent } from '../message/view-message/message-view-message.component'

import { MessageMessagelistComponent } from '../message/messagelist/message-messagelist.component'

import { MessageForm1Component } from '../message/form-1/message-form-1.component'

const routes: Routes = [
  ...customRoutes,
  // palmyra-needle-angular-add-screen-route Do not delete this line. Palmyra will add new route here
  {
    path: 'view-message/:id',
    component: MessageViewMessageComponent,
  },
  {
    path: 'view-message',
    component: MessageViewMessageComponent,
  },

  {
    path: 'messagelist',
    component: MessageMessagelistComponent,
  },

  {
    path: 'Form-1/:id',
    component: MessageForm1Component,
  },
  {
    path: 'Form-1',
    component: MessageForm1Component,
  },
]

/**
 * The Message routing module
 *
 * @stable
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {}
