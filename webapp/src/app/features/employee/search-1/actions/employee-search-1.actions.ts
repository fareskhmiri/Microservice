import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ActionHandler } from '@app/core/components/actions/action.handler'

import { Button04826Action } from './employee-button-04826-search-1.action'
/**
 * @deprecated
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Service that runs the actions` lifecycle generated from the configured `actions` via `UI Studio` tool.
 */
@Injectable()
export class EmployeeSearch1Actions {
  constructor(
    private actionHandler: ActionHandler,

    private button04826Action: Button04826Action
  ) {}

  /**
   * Launches the lifecycle execution of the `Button-04826` action
   * @returns {Observable}
   */
  button04826(context): Observable<any> {
    return this.actionHandler.perform(this.button04826Action, context)
  }
}
