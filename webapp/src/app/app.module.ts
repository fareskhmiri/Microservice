import { FormsModule } from '@angular/forms'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { RouterModule, Router, RouteReuseStrategy } from '@angular/router'
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpBackend,
} from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { RouterState } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '@env/environment'
import { CoreModule } from '@core/core.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from '@auth/auth.module'
import { RequestInterceptorService } from '@services/request-interceptor/request-interceptor.service'
import { SharedModule } from '@shared/shared.module'
import { JwtModule } from '@palmyra/angular-jwt-security'
import { Globals } from '@core/global/globals'
import { reducers, metaReducers } from '@core/store'
import { CustomAppModule } from './custom-app.module'
import { FeatureEffects } from '@core/store/feature-effects'
import { MenuService } from './core/services/menu/menu.service'
import { TranslatorService } from './core/services/translator/translator.service'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AuthManagerService } from '@core/services/auth/auth-manager.service'

declare global {
  interface Navigator {
    msSaveBlob
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => boolean
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json')
}

export function initializeApp(
  httpBackend: HttpBackend,
  authService: AuthManagerService
) {
  return () => {
    return authService.getSecurity(httpBackend)
  }
}

/**
 * The main application module
 *
 * @stable
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    JwtModule.forRoot(environment),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    /**
     * ngrx store root
     */
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([FeatureEffects]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
        })
      : [],

    CustomAppModule,
  ],
  providers: [
    { provide: 'menuService', useClass: MenuService },
    { provide: 'translatorService', useClass: TranslatorService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    { provide: 'environment', useValue: { ...environment } },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [HttpBackend, AuthManagerService],
    },
    AuthManagerService,

    Globals,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
