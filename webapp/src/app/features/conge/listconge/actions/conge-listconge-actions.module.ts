import { NgModule } from '@angular/core'

import { CongeListcongeActions } from './conge-listconge.actions'
import { EditAction } from './conge-edit-listconge.action'
import { Button66719Action } from './conge-button-66719-listconge.action'
import { Button26614Action } from './conge-button-26614-listconge.action'
/**
 * @deprecated
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Module that exports all the actions` services generated from the configured `actions` via `UI Studio` tool.
 */
@NgModule({
  providers: [
    EditAction,
    Button66719Action,
    Button26614Action,
    CongeListcongeActions,
  ],
})
export class CongeListcongeActionsModule {}
