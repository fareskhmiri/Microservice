import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Injectable, Optional } from '@angular/core'
import { Store } from '@ngrx/store'
import { environment } from '@env/environment'

import { LoaderService } from '@app/core/components/loaders/services/loader.service'
import { MessagesService as Messages } from '@services/messages/message.service'
import { PATTERN_ISO8601 } from '@app/core/utils/date.util'
import { logOut } from '@app/auth/store/actions/auth.actions'
import { State } from '@app/core/store'
import * as moment from 'moment'
const PATTERN_NUMBER = /^-?[0-9,.]*$/

/**
 * Intercepts and handles an HttpRequest or HttpResponse.
 *
 * This class should not be modified directly.
 */
@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    public router: Router,
    private messageService: Messages,
    private store: Store<State>
  ) {}
  /**
   * Intercepts
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @return {Observable<HttpEvent<any>>}
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers
      .set('Cache-control', 'no-store, no-cache')
      .set('Expires', '-1')
      .set('Pragma', 'no-cache')
    req = req.clone({ headers: headers, url: encodeURI(req.url) })

    // start our loader here
    this.loaderService.show()
    return next.handle(req).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          const body = httpEvent.body
          this.convertToDate(body)
        }
        // stop loader Service
        this.loaderService.hide()
      }),
      catchError((err: HttpErrorResponse) => {
        this.loaderService.hide()
        this.messageService.showException(err)
        if (err.status === 401) {
          this.store.dispatch(logOut({}))
        }
        return throwError(err)
      })
    )
  }

  /**
   * Converts to date
   * @param body
   */
  private convertToDate(body): void {
    if (body === null || body === undefined || typeof body !== 'object') {
      return body
    }
    for (const key of Object.keys(body)) {
      const value = body[key]
      if (this.isIso8601(value)) {
        if (moment(value, 'YYYY-MM-DD', true).isValid()) {
          body[key] = moment(value)
            .set({
              h: 12,
              m: 0,
              s: 0,
            })
            .toDate()
        } else {
          body[key] = new Date(value)
        }
      } else if (typeof value === 'object') {
        this.convertToDate(value)
      }
    }
  }

  /**
   * Verifies whether the value respects the iso 8601 or not
   * @param value
   */
  private isIso8601(value: string): boolean {
    if (value === null || value === undefined || PATTERN_NUMBER.test(value)) {
      return false
    }
    return PATTERN_ISO8601.test(value)
  }
}
