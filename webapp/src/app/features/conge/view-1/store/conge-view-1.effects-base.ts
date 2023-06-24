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
import * as fromConge from '../store/conge-view-1.actions'
import { MessagesService as Messages } from '@app/core/services/messages/message.service'
import { FeatureService } from '@services/feature/feature.service'
import { ConditionEvaluatorService } from '@app/core/services/condition-evaluator/condition-evaluator.service'

import { environment } from '@env/environment'
/**
 * The base REST API path
 */
const BASE_PATH = environment.basePath
/**
 * The basic effect of the `view` component that fetches the object's value.
 * It also handles the business logic and navigation of the configured actions using the `Button` component.
 *
 * It is not recommended to modify this class.
 */
@Injectable()
export class CongeView1EffectsBase {
  actions$ = inject(Actions)
  store = inject(Store)
  message = inject(Messages)
  httpClient = inject(HttpClient)
  featureService = inject(FeatureService)
  activeRoute = inject(ActivatedRoute)
  conditionEvaluator = inject(ConditionEvaluatorService)
  constructor() {}

  /**
   * NGRX Effect that initializes the state's value
   */
  initValue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromConge.initValueAction),
        switchMap((payload) => {
          if (payload.parentCtx && payload.parentCtx.roleName) {
            return this.store
              .select(fromStore.selectRoleValue, {
                ...payload.parentCtx,
                code: payload.code,
              })
              .pipe(
                map((result) =>
                  fromConge.initValueSuccessAction({
                    ...payload,
                    result,
                  })
                ),
                catchError((error) =>
                  of(fromConge.initValueFailAction({ ...payload, error }))
                )
              )
          } else {
            const params = {}
            const code: any = getParamValue(
              fromStore.getScreenActiveRoute(payload.id),
              'code'
            )
            return this.httpClient
              .get<any>(`${BASE_PATH}/conges/${code}`, { params })
              .pipe(
                map((result) => {
                  this.message.showHttpMessages(result)
                  return fromConge.initValueSuccessAction({
                    ...payload,
                    result: result || {},
                  })
                }),
                catchError((error) =>
                  of(fromConge.initValueFailAction({ ...payload, error }))
                )
              )
          }
        })
      ),
    { useEffectsErrorHandler: true }
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton78427$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConge.button78427Action),
      map((context: any) => {
        return fromStore.navigateByBackAction(context)
      })
    )
  )

  /**
   * This method displays messages
   * @param params
   * @returns {Observable}
   */
  postButton78427Execute(params): Observable<any> {
    return of(params)
  }
}
