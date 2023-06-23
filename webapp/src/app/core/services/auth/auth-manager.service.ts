import { Injectable } from '@angular/core'
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http'
import { Store } from '@ngrx/store'
import { State } from '@app/core/store'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, Subject, of, ReplaySubject, BehaviorSubject } from 'rxjs'
import {
  filter,
  switchMap,
  takeUntil,
  tap,
  catchError,
  map,
} from 'rxjs/operators'

import {
  logOut,
  logIn,
  logInFailed,
} from '@app/auth/store/actions/auth.actions'
import { environment } from '@env/environment'
import { HttpUrlEncodingCodec } from './encoder'
import { JwtHelperService } from '@palmyra/angular-jwt-security'
const BASE_PATH = environment.basePath

/**
 * The main security class that authenticates and disconnects the user, checks if the user is `logged on` or `not` and
 * provides the user's roles and name.
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyAuthManagerService extends AuthManagerService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
    { provide: AuthManagerService, useClass: MyAuthManagerService }
 ]
 ```
 * */
@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  /**
   * The source emitter for the client's brand name
   */
  brandSubject = new ReplaySubject<string>()
  /**
   * Change password option
   */
  resetPassword: boolean
  /**
   * Path uiSecurity.json
   */
  filePath: string = 'assets/security/ui-security.json'
  securityData
  /**
   * Default constructor
   */
  constructor(
    protected store: Store<State>,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected router: Router,
    protected service: JwtHelperService
  ) {
    this.initBrandName()
  }
  /**
   * Post the login request using the username & password
   * @param credential user to authenticate
   * @returns {Observable<any>} user token
   */
  authenticateUser(credential): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })

    const body = new HttpParams({
      encoder: new HttpUrlEncodingCodec(),
      fromObject: {
        username: credential.username,
        password: credential.password,
      },
    }).toString()

    this.http
      .post(`${BASE_PATH}/security/authenticate`, body, {
        headers,
      })
      .subscribe(
        (data) => {
          if (this.isChangePasswordRequired()) {
            this.resetPassword = this.isChangePasswordRequired()
          } else {
            this.store.dispatch(logIn(credential))
          }
        },
        (error) => {
          this.store.dispatch(logInFailed(error))
        }
      )
  }
  /**
   * Checks if the current user is `logged on` `not`
   * @return {boolean}
   */
  isLogged(): any {
    return this.service.isLogged()
  }
  /**
   * Checks if the `change password` option is required
   * @return {boolean}
   */
  isChangePasswordRequired(): boolean {
    const token = this.getAccessToken()
    if (token) {
      const decodedToken = this.decodeToken()
      return decodedToken?.resetPwd ?? false
    }
  }
  /**
   * Gets the user's roles
   * @return {array}
   */
  getRoles(): any {
    return this.service.getRoles()
  }
  /**
   * check if the current user is allowed
   * @param {object} rolesBase - roles base list
   * @return {string} boolean
   */
  isUserRolesHas(rolesBase: Set<String> = new Set(['admin'])): boolean {
    return (
      this.getRoles() &&
      this.getRoles().filter((role) => rolesBase.has(role)).length > 0
    )
  }
  /**
   * Returns the access token
   * @returns {any} the access token if exists
   */
  getAccessToken(): any {
    return this.service.getAccessToken()
  }
  /**
   * Clears the access and refresh tokens
   * @returns {void}
   */
  removeAccessToken(): void {
    this.service.removeAccessToken()
  }
  /**
   * Decodes the JWT access token
   */
  decodeToken(): any {
    return this.service.decodeToken()
  }
  /**
   * Gets the user's name
   * */
  getUserName(): string {
    return this.service.getUserName()
  }
  /**
   * Gets the user's name
   * */
  getName(): string {
    return this.getUserName()
  }
  /**
   * Post the logout request using access token
   * @returns {Observable<any>}
   */
  logout(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })

    const body = new HttpParams({
      fromObject: {
        accessToken: this.getAccessToken(),
      },
    }).toString()

    this.http
      .post(`${BASE_PATH}/security/logout`, body, {
        headers,
      })
      .subscribe(
        (value) => this.doLogout(),
        (error) => this.doLogout()
      )
  }
  /**
   * Logout the user
   */
  private doLogout() {
    this.store.dispatch(logOut({}))
  }
  /**
   * Implement this method in a custom service to set the brand name for
   * your users from token, cookie, REST call...etc
   */
  initBrandName() {
    /**
    this.brandSubject.next('example');
    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params['brand']) {
          this.brandSubject.next(params['brand']);
        }
      });
      */
  }

  /*
   * Fetch the security data Observable
   */
  getSecurity(httpBackend: HttpBackend) {
    return httpBackend.handle(new HttpRequest('GET', this.filePath)).pipe(
      map((response: any) => response.body),
      catchError((error) => of({})),
      tap((data) => (this.securityData = data))
    )
  }

  /*
   * Returns the security data as Object
   */
  getSecurityData() {
    return this.securityData
  }
}
