import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, EMPTY, forkJoin } from 'rxjs'
import {
  tap,
  map,
  switchMap,
  take,
  catchError,
  withLatestFrom,
  filter,
  concatMap,
  mergeMap,
  finalize,
} from 'rxjs/operators'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { Store, select } from '@ngrx/store'
import { get, mergeWith, camelCase } from 'lodash'

import { ActivatedRoute } from '@angular/router'
import { getValue, getParamValue } from '@app/shared/utils/feature-utils'
import * as fromStore from '@app/core/store'
import * as fromMessage from '../store/message-messagelist.actions'
import { ActionHandler } from '@app/core/components/actions/action.handler'
import { MessagesService as Messages } from '@app/core/services/messages/message.service'
import { FeatureService } from '@services/feature/feature.service'
import { ConditionEvaluatorService } from '@app/core/services/condition-evaluator/condition-evaluator.service'

import { Button91271Action } from '../actions/message-button-91271-messagelist.action'
import { Button01644Action } from '../actions/message-button-01644-messagelist.action'
import { Button03772Action } from '../actions/message-button-03772-messagelist.action'
import { environment } from '@env/environment'

/**
 * The base REST API path
 */
const BASE_PATH = environment.basePath
/**
 * The basic effect of the `search` component that fetches the collection of items and their total number.
 * It also handles the business logic and navigation of the configured actions using the `Button` component.
 *
 * It is not recommended to modify this class.
 */
@Injectable()
export class MessageMessagelistEffects {
  constructor(
    private actions$: Actions,
    private actionHandler: ActionHandler,
    private store: Store<fromStore.State>,
    private message: Messages,
    private httpClient: HttpClient,
    private featureService: FeatureService,
    private activeRoute: ActivatedRoute,
    private button91271Action: Button91271Action,
    private button01644Action: Button01644Action,
    private button03772Action: Button03772Action
  ) {}

  /**
   * NGRX effect that fetches the total number of items
   */
  count$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromMessage.countAction),
        switchMap((payload) => {
          return of(0).pipe(
            map((result) =>
              fromMessage.countSuccessAction({
                ...payload,
                totalItems: result,
              })
            ),
            catchError((error) => {
              return of(fromMessage.countFailAction({ ...payload, error }))
            })
          )
        })
      ),
    { useEffectsErrorHandler: true }
  )
  /**
   * NGRX effect that fetches the data
   */
  find$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromMessage.searchAction, fromMessage.refresh),
        switchMap((payload) => {
          const params = {}
          return this.httpClient
            .get<any>(`${BASE_PATH}/messages/all`, { params })
            .pipe(
              switchMap((result) => {
                this.message.showHttpMessages(result)
                return [
                  fromMessage.searchSuccessAction({
                    ...payload,
                    value: result,
                  }),
                  fromMessage.countAction({
                    ...payload,
                    ...payload.vars,
                  }),
                ]
              }),
              catchError((error) => {
                return of(fromMessage.searchFailAction({ ...payload, error }))
              })
            )
        })
      ),
    { useEffectsErrorHandler: true }
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton91271$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMessage.button91271Action),
      map((context: any) => {
        context['path'] = '/message/Form-1'
        context['navigationType'] = 'switch'
        context['feature'] = 'message'
        context['screen'] = 'Form-1'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {}
        context['pathParams'] = [getValue(context.data, `_id`, '')]
        context['state'] = {}
        return fromStore.navigateBySwitchAction(context)
      })
    )
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton01644$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMessage.button01644Action),
      map((context: any) => {
        context['path'] = '/message/view-message'
        context['navigationType'] = 'switch'
        context['feature'] = 'message'
        context['screen'] = 'view-message'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {}
        context['pathParams'] = [getValue(context.data, `_id`, '')]
        context['state'] = {}
        return fromStore.navigateBySwitchAction(context)
      })
    )
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton03772$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMessage.button03772Action),
      map((context: any) => {
        context['path'] = '/message/Form-1'
        context['navigationType'] = 'switch'
        context['feature'] = 'message'
        context['screen'] = 'Form-1'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {}
        context['state'] = {}
        return fromStore.navigateBySwitchAction(context)
      })
    )
  )
}
