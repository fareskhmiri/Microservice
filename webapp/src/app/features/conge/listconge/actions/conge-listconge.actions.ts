import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ActionHandler } from '@app/core/components/actions/action.handler'

import { EditAction } from './conge-edit-listconge.action'
import { Button66719Action } from './conge-button-66719-listconge.action'
import { Button26614Action } from './conge-button-26614-listconge.action'
/**
 * @deprecated
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Service that runs the actions` lifecycle generated from the configured `actions` via `UI Studio` tool.
 */
@Injectable()
export class CongeListcongeActions {
  constructor(
    private actionHandler: ActionHandler,

    private editAction: EditAction,
    private button66719Action: Button66719Action,
    private button26614Action: Button26614Action
  ) {}

  /**
   * Launches the lifecycle execution of the `edit` action
   * @returns {Observable}
   */
  edit(context): Observable<any> {
    return this.actionHandler.perform(this.editAction, context)
  }

  /**
   * Launches the lifecycle execution of the `Button-66719` action
   * @returns {Observable}
   */
  button66719(context): Observable<any> {
    return this.actionHandler.perform(this.button66719Action, context)
  }

  /**
   * Launches the lifecycle execution of the `Button-26614` action
   * @returns {Observable}
   */
  button26614(context): Observable<any> {
    return this.actionHandler.perform(this.button26614Action, context)
  }
}
