import { Injectable, Injector } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { kebabCase } from 'lodash'

import { AuthManagerService } from '@services/auth/auth-manager.service'
import { State } from '@app/core/store'
import { MessagesService as Messages } from '@app/core/services/messages/message.service'
import { logOut } from '@app/auth/store/actions/auth.actions'
import { PolicyService } from '../policy/policy.service'
/**
 * This Guard decides if a route can be activated. If all guards return `true`, navigation continues. If any guard returns `false`,
 * navigation is cancelled. If any guard returns a `UrlTree`, the current navigation
 * is cancelled and a new navigation begins to the `UrlTree` returned from the guard.
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyAuthGuardService extends AuthGuardService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: AuthGuardService, useClass: MyAuthGuardService }
  ]
 ```
 * */
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  /**
   * Default constructor
   */
  constructor(
    protected router: Router,
    protected injector: Injector,
    protected message: Messages,
    protected authService: AuthManagerService,
    protected store: Store<State>,
    private policyService: PolicyService
  ) {}

  /**
   * can activate routing
   * @param {ActivatedRouteSnapshot} next
   * @return {boolean}
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const isActive = this.isScreenAuthorized(next, this.authService.isLogged())
    if (!isActive) {
      this.store.dispatch(logOut({}))
    }
    return isActive
  }
  /**
   * Checks if the screen's route can be activated
   * @param {ActivatedRouteSnapshot} next
   * @param {boolean} isActive
   * @return {boolean}
   */
  isScreenAuthorized(next: ActivatedRouteSnapshot, isActive: boolean): boolean {
    try {
      const urlSeg = next['_urlSegment']['segments']
      const featureName = kebabCase(
        isNaN(urlSeg[0].path) ? urlSeg[0].path : urlSeg[1].path
      )
      const useCaseName = kebabCase(
        isNaN(urlSeg[0].path) ? urlSeg[1].path : urlSeg[2].path
      )
      if (featureName && isActive) {
        const service = this.policyService
        if (!service.isScreenAuthorized(featureName, useCaseName)) {
          this.message.openErrorMessage(
            $localize`:message;notAllowedToOpenScreen:You are not allowed to open this screen`
          )
          this.router.navigate(['/'])
          isActive = false
        }
      }
    } catch (error) {
      // no policy service is provided for this feature
    }
    return isActive
  }
}
