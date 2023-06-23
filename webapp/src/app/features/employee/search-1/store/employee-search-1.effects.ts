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
import * as fromEmployee from '../store/employee-search-1.actions'
import { ActionHandler } from '@app/core/components/actions/action.handler'
import { MessagesService as Messages } from '@app/core/services/messages/message.service'
import { FeatureService } from '@services/feature/feature.service'
import { ConditionEvaluatorService } from '@app/core/services/condition-evaluator/condition-evaluator.service'

import { Button04826Action } from '../actions/employee-button-04826-search-1.action'
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
export class EmployeeSearch1Effects {
  constructor(
    private actions$: Actions,
    private actionHandler: ActionHandler,
    private store: Store<fromStore.State>,
    private message: Messages,
    private httpClient: HttpClient,
    private featureService: FeatureService,
    private activeRoute: ActivatedRoute,
    private button04826Action: Button04826Action
  ) {}

  /**
   * NGRX effect that fetches the total number of items
   */
  count$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromEmployee.countAction),
        switchMap((payload) => {
          return of(0).pipe(
            map((result) =>
              fromEmployee.countSuccessAction({
                ...payload,
                totalItems: result,
              })
            ),
            catchError((error) => {
              return of(fromEmployee.countFailAction({ ...payload, error }))
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
        ofType(fromEmployee.searchAction, fromEmployee.refresh),
        switchMap((payload) => {
          const params = {}
          return this.httpClient
            .get<any>(`${BASE_PATH}/employees/getAllEmployee`, { params })
            .pipe(
              switchMap((result) => {
                this.message.showHttpMessages(result)
                return [
                  fromEmployee.searchSuccessAction({
                    ...payload,
                    value: result,
                  }),
                  fromEmployee.countAction({
                    ...payload,
                    ...payload.vars,
                  }),
                ]
              }),
              catchError((error) => {
                return of(fromEmployee.searchFailAction({ ...payload, error }))
              })
            )
        })
      ),
    { useEffectsErrorHandler: true }
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton04826$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromEmployee.button04826Action),
      map((context: any) => {
        context['path'] = '/employee/Form-1'
        context['navigationType'] = 'switch'
        context['feature'] = 'employee'
        context['screen'] = 'Form-1'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {}
        context['state'] = {}
        return fromStore.navigateBySwitchAction(context)
      })
    )
  )
}
