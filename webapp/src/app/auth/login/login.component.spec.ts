import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, ReplaySubject } from 'rxjs';
import { TestBed, ComponentFixture, waitForAsync, fakeAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { SharedModule } from '@app/shared/shared.module';
import { LoaderMaskComponent } from '@app/core/components/loaders/loader-mask/loader-mask.component';
import { ChangePasswordComponent } from '@app/core/components/change-password/change-password.component';
import { LoaderService } from '@app/core/components/loaders/services/loader.service';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { LogoComponent } from '@app/core/components/logo/logo.component';

class MockAuthenticationService {
  brandSubject = new ReplaySubject<string>();
  authenticateUser(user: any): Observable<any> {
    return of(user);
  }
  isLogged(): boolean {
    return false;
  }
}
class MockTranslatorService {
  getMessage(value: any): Observable<any> {
    return of({});
  }
}

const mockStore = {
  select: () => {
    return of(true);
  }
};

let router = {
  navigate: jasmine.createSpy('navigate')
}


describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoaderService;

  beforeEach(waitForAsync(() => {
    mockLoaderService = jasmine.createSpyObj('mockLoaderService', ['show', 'hide']);

    TestBed.configureTestingModule({
      declarations: [LogoComponent, LoginComponent, LoaderMaskComponent, ChangePasswordComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: AuthManagerService, useClass: MockAuthenticationService },
        { provide: Router, useValue: {} },
        { provide: Router, useValue: router },
        { provide: TranslatorService, useClass: MockTranslatorService },
        { provide: LoaderService, useValue: mockLoaderService },
      ],
      imports: [FormsModule, ReactiveFormsModule, SharedModule],
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'changePassword').and.callThrough();
  });


  it('should create a form having username and password as controls', () => {
    expect(Object.keys(component.form.controls)[0]).toEqual('username');
    expect(Object.keys(component.form.controls)[1]).toEqual('password');
  });
  it('should create a form having username and password as empty controls', () => {
    expect(component.form.get('username').value).toEqual('');
    expect(component.form.get('password').value).toEqual('');
  });

  it(`should return Succes Reset`, () => {
    expect(component.onResetSuccess('')).toBe(undefined);
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy()
    const dataUser = {
      username: 'test',
      password: '123456789'
    }
    component.form.patchValue(dataUser)
    expect(component.form.valid).toBeTruthy()
    component.onSubmit();
  });


});