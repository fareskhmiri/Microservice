import { Injectable, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { tap, switchMap, map, catchError } from 'rxjs/operators'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { AuthManagerService } from '@services/auth/auth-manager.service'
import { ProfileService } from '@app/core/services/profile/profile.service'
import {
  AuthActionTypes,
  logIn,
  logInFailed,
  logInSuccessfully,
} from '../actions/auth.actions'
import { TranslatorService } from '@services/translator/translator.service'

/**
 * Effect that interactes with the REST API to authenticate and logout the user using JWT tokens
 *
 * This class should not be modified.
 */
@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthManagerService,
    private translator: TranslatorService
  ) {}
  /**
   * The NGRX login effect
   */
  login$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((payload) => payload),
        switchMap((payload: any) =>
          this.profileService.get().pipe(
            map((profile) =>
              logInSuccessfully({ ...payload, profile: { ...profile } })
            ),
            catchError((error) =>
              of(
                logInSuccessfully({
                  ...payload,
                  profile: { ...this.profileService.getDefault() },
                })
              )
            )
          )
        )
      ),
    { dispatch: true }
  )
  /**
   * The NGRX success login effect
   */
  loginSuccessfully$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESSFULLY),
        tap(() => {
          this.router.navigate(['/'])
          this.translator.initLanguage()
          this.translator.applyPreferedLanguage()
        })
      ),
    { dispatch: false }
  )
  /**
   * The NGRX logout effect
   */
  logOut$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
          this.authService.removeAccessToken()

          this.router.navigate(['/login'])
        })
      ),
    { dispatch: false }
  )
}
