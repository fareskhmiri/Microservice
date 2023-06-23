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
import * as fromDepartement from '../store/departement-search-1.actions'
import { ActionHandler } from '@app/core/components/actions/action.handler'
import { MessagesService as Messages } from '@app/core/services/messages/message.service'
import { FeatureService } from '@services/feature/feature.service'
import { ConditionEvaluatorService } from '@app/core/services/condition-evaluator/condition-evaluator.service'

import { Button63307Action } from '../actions/departement-button-63307-search-1.action'
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
export class DepartementSearch1Effects {
  constructor(
    private actions$: Actions,
    private actionHandler: ActionHandler,
    private store: Store<fromStore.State>,
    private message: Messages,
    private httpClient: HttpClient,
    private featureService: FeatureService,
    private activeRoute: ActivatedRoute,
    private button63307Action: Button63307Action
  ) {}

  /**
   * NGRX effect that fetches the total number of items
   */
  count$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromDepartement.countAction),
        switchMap((payload) => {
          return of(0).pipe(
            map((result) =>
              fromDepartement.countSuccessAction({
                ...payload,
                totalItems: result,
              })
            ),
            catchError((error) => {
              return of(fromDepartement.countFailAction({ ...payload, error }))
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
        ofType(fromDepartement.searchAction, fromDepartement.refresh),
        switchMap((payload) => {
          const params = {}
          return this.httpClient
            .get<any>(`${BASE_PATH}/department/getAllDepartment`, { params })
            .pipe(
              switchMap((result) => {
                this.message.showHttpMessages(result)
                return [
                  fromDepartement.searchSuccessAction({
                    ...payload,
                    value: result,
                  }),
                  fromDepartement.countAction({
                    ...payload,
                    ...payload.vars,
                  }),
                ]
              }),
              catchError((error) => {
                return of(
                  fromDepartement.searchFailAction({ ...payload, error })
                )
              })
            )
        })
      ),
    { useEffectsErrorHandler: true }
  )

  /**
   * Navigates to a target screen
   */
  navigateAfterbutton63307$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDepartement.button63307Action),
      map((context: any) => {
        context['path'] = '/departement/Add-department'
        context['navigationType'] = 'switch'
        context['feature'] = 'departement'
        context['screen'] = 'Add-department'
        context['activeRoute'] = fromStore.getScreenActiveRoute(context.id)
        context['queryParams'] = {}
        context['state'] = {}
        return fromStore.navigateBySwitchAction(context)
      })
    )
  )
}
