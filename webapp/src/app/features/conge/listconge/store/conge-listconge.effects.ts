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
import * as fromConge from '../store/conge-listconge.actions'
import { ActionHandler } from '@app/core/components/actions/action.handler'
import { MessagesService as Messages } from '@app/core/services/messages/message.service'
import { FeatureService } from '@services/feature/feature.service'
import { ConditionEvaluatorService } from '@app/core/services/condition-evaluator/condition-evaluator.service'

import { EditAction } from '../actions/conge-edit-listconge.action'
import { Button66719Action } from '../actions/conge-button-66719-listconge.action'
import { Button26614Action } from '../actions/conge-button-26614-listconge.action'
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
export class CongeListcongeEffects {
  constructor(
    private actions$: Actions,
    private actionHandler: ActionHandler,
    private store: Store<fromStore.State>,
    private message: Messages,
    private httpClient: HttpClient,
    private featureService: FeatureService,
    private activeRoute: ActivatedRoute,
    private editAction: EditAction,
    private button66719Action: Button66719Action,
    private button26614Action: Button26614Action
  ) {}

  /**
   * NGRX effect that fetches the total number of items
   */
  count$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromConge.countAction),
        switchMap((payload) => {
          return of(0).pipe(
            map((result) =>
              fromConge.countSuccessAction({
                ...payload,
                totalItems: result,
              })
            ),
            catchError((error) => {
              return of(fromConge.countFailAction({ ...payload, error }))
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
        ofType(fromConge.searchAction, fromConge.refresh),
        switchMap((payload) => {
          return of([]).pipe(
            switchMap((result) => {
              this.message.showHttpMessages(result)
              return [
                fromConge.searchSuccessAction({
                  ...payload,
                  value: result,
                }),
                fromConge.countAction({
                  ...payload,
                  ...payload.vars,
                }),
              ]
            }),
            catchError((error) => {
              return of(fromConge.searchFailAction({ ...payload, error }))
            })
          )
        })
      ),
    { useEffectsErrorHandler: true }
  )

  /**
   * Navigates to a target screen
   */
  navigateAfteredit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConge.editAction),
      map((context: any) => {
        context['path'] = '/conge/add-conge'
        context['navigationType'] = 'switch'
        context['feature'] = 'conge'
        context['screen'] = 'add-conge'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {
          code: getValue(context.data, `id`, ''),
        }
        context['state'] = {}
        return fromStore.navigateBySwitchAction(context)
      })
    )
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton66719$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConge.button66719Action),
      map((context: any) => {
        context['path'] = '/conge/view-1'
        context['navigationType'] = 'switch'
        context['feature'] = 'conge'
        context['screen'] = 'view-1'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {
          code: getValue(context.data, `id`, ''),
        }
        context['state'] = {}
        return fromStore.navigateBySwitchAction(context)
      })
    )
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton26614$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConge.button26614Action),
      map((context: any) => {
        context['path'] = '/conge/add-conge'
        context['navigationType'] = 'call'
        context['feature'] = 'conge'
        context['screen'] = 'add-conge'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {}
        context['state'] = {}
        return fromStore.navigateByCallAction(context)
      })
    )
  )
}
