import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ActionHandler } from '@app/core/components/actions/action.handler'

import { Button91271Action } from './message-button-91271-messagelist.action'
import { Button01644Action } from './message-button-01644-messagelist.action'
import { Button03772Action } from './message-button-03772-messagelist.action'
/**
 * @deprecated
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Service that runs the actions` lifecycle generated from the configured `actions` via `UI Studio` tool.
 */
@Injectable()
export class MessageMessagelistActions {
  constructor(
    private actionHandler: ActionHandler,

    private button91271Action: Button91271Action,
    private button01644Action: Button01644Action,
    private button03772Action: Button03772Action
  ) {}

  /**
   * Launches the lifecycle execution of the `Button-91271` action
   * @returns {Observable}
   */
  button91271(context): Observable<any> {
    return this.actionHandler.perform(this.button91271Action, context)
  }

  /**
   * Launches the lifecycle execution of the `Button-01644` action
   * @returns {Observable}
   */
  button01644(context): Observable<any> {
    return this.actionHandler.perform(this.button01644Action, context)
  }

  /**
   * Launches the lifecycle execution of the `Button-03772` action
   * @returns {Observable}
   */
  button03772(context): Observable<any> {
    return this.actionHandler.perform(this.button03772Action, context)
  }
}
