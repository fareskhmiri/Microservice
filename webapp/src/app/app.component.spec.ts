import {
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { of, ReplaySubject } from 'rxjs';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { TranslatorService } from './core/services/translator/translator.service';
import { LoaderService } from './core/components/loaders/services/loader.service';
import { LoaderMaskComponent } from './core/components/loaders/loader-mask/loader-mask.component';
import { AuthManagerService } from './core/services/auth/auth-manager.service';
import { BrandingComponent } from './core/components/branding/branding.component';
class MockAuthenticationService {
  brandSubject = new ReplaySubject<string>();
}
describe('Main: AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SharedModule,
          RouterModule.forRoot([]),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
        ],
        declarations: [AppComponent, LoaderMaskComponent,BrandingComponent],
        providers: [
          {provide: AuthManagerService, useClass: MockAuthenticationService },
          { provide: APP_BASE_HREF, useValue: '/' },
          {provide: Router , useValue: { events : of(new NavigationStart(1,'/login'))}},
          {provide: TranslatorService , useValue: {initLanguage : () => {}}},
          LoaderService

        ]
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
    })
  );

});
