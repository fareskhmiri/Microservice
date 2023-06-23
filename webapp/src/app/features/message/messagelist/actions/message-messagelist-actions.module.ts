import { NgModule } from '@angular/core'

import { MessageMessagelistActions } from './message-messagelist.actions'
import { Button91271Action } from './message-button-91271-messagelist.action'
import { Button01644Action } from './message-button-01644-messagelist.action'
import { Button03772Action } from './message-button-03772-messagelist.action'
/**
 * @deprecated
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Module that exports all the actions` services generated from the configured `actions` via `UI Studio` tool.
 */
@NgModule({
  providers: [
    Button91271Action,
    Button01644Action,
    Button03772Action,
    MessageMessagelistActions,
  ],
})
export class MessageMessagelistActionsModule {}
