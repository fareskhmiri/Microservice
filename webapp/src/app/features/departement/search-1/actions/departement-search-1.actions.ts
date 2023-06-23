import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ActionHandler } from '@app/core/components/actions/action.handler'

import { Button63307Action } from './departement-button-63307-search-1.action'
/**
 * @deprecated
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Service that runs the actions` lifecycle generated from the configured `actions` via `UI Studio` tool.
 */
@Injectable()
export class DepartementSearch1Actions {
  constructor(
    private actionHandler: ActionHandler,

    private button63307Action: Button63307Action
  ) {}

  /**
   * Launches the lifecycle execution of the `Button-63307` action
   * @returns {Observable}
   */
  button63307(context): Observable<any> {
    return this.actionHandler.perform(this.button63307Action, context)
  }
}
