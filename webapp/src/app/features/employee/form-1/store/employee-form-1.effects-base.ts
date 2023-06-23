import { createAction as ngrxCreateAction } from '@ngrx/store'
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
import * as fromEmployee from '../store/employee-form-1.actions'
import { MessagesService as Messages } from '@app/core/services/messages/message.service'
import { FeatureService } from '@services/feature/feature.service'
import { ConditionEvaluatorService } from '@app/core/services/condition-evaluator/condition-evaluator.service'

import { environment } from '@env/environment'
/**
 * The base REST API path
 */
const BASE_PATH = environment.basePath
/**
 * The basic effect of the `edit` component that fetches the object's value and possible input values for Input components like `ComboBox`.
 * It also handles the business logic and navigation of the configured actions using the `Button` component.
 *
 * It is not recommended to modify this class.
 */
@Injectable()
export class EmployeeForm1EffectsBase {
  actions$ = inject(Actions)
  store = inject(Store)
  message = inject(Messages)
  httpClient = inject(HttpClient)
  featureService = inject(FeatureService)
  activeRoute = inject(ActivatedRoute)
  conditionEvaluator = inject(ConditionEvaluatorService)

  constructor() {}

  /**
   * Fetches the initial value
   */
  initValueService = (payload: any) => {
    if (
      payload.parentCtx &&
      payload.parentCtx.roleName &&
      payload.code !== undefined
    ) {
      return this.store.select(fromStore.selectRoleValue, {
        ...payload.parentCtx,
        code: payload.code,
      })
    }
    if (payload.code === undefined) {
      return of({})
    } else {
      return of({})
    }
  }
  /**
   * NGRX Effect that initializes the state's value
   */
  initValue$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(fromEmployee.initValueAction),
        switchMap((payload) => {
          return this.initValueService(payload).pipe(
            map((result) => {
              this.message.showHttpMessages(
                result,
                payload?.objectResponse?.messagesKey
              )
              return fromEmployee.initValueSuccessAction({
                ...payload,
                result: payload?.objectResponse?.content
                  ? result[payload.objectResponse.content]
                  : result || {},
              })
            }),
            catchError((error) =>
              of(fromEmployee.initValueFailAction({ ...payload, error }))
            )
          )
        })
      ),
    { useEffectsErrorHandler: true }
  )

  /**
   * Effect that runs the `button54477` action and dispatches a `success` or `echec` action
   */
  button54477Action$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromEmployee.button54477Action),
      switchMap((payload) => {
        return of(payload)
          .pipe(
            switchMap((dataExe) => this.executeButton54477(dataExe)),
            switchMap((dataPost) => this.postButton54477Execute(dataPost))
          )
          .pipe(
            map((result) =>
              fromEmployee.button54477SuccessAction({
                ...payload,
                data: mergeWith(payload.data, result),
              })
            ),
            catchError((error) =>
              of(fromEmployee.button54477FailAction({ ...payload }))
            )
          )
      })
    )
  )

  /**
   * This method runs first to control or validate the input data
   * @param params
   * @returns {Observable}
   */
  preButton54477Execute(params): Observable<any> {
    return of(params)
  }
  /**
   * This is the main method that interacts with the REST API
   * @param context
   * @returns {Observable}
   */
  executeButton54477(context): Observable<any> {
    const params = {}
    return this.httpClient.post<any>(
      `${BASE_PATH}/employees/createEmployee`,
      context.data,
      { params }
    )
  }

  postButton54477Execute(params): Observable<any> {
    this.message.showHttpMessages(params)
    return of(params)
  }
}
