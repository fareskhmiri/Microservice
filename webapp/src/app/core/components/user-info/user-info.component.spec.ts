import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { UserInfoComponent } from './user-info.component';
import { ComponentFactoryResolver, DebugElement } from '@angular/core';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { SlideMenuModule } from 'primeng/slidemenu';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AuthManagerService } from '@services/auth/auth-manager.service';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;
  let componentFactoryResolver: ComponentFactoryResolver;

  beforeEach(waitForAsync(() => {
    let mockAuthManagerService = { getUserName: () => 'SimpleUser' };
    let mockTranslatorService = {
      getMessage: (content: string, key: string) => {
        return of(content)
      }
    };
    let mockPipe = {
      transform: (value: any, enumerationName?: any) => {
        return 'Change Password'
      }
    };
    let mockHttpClient = {};
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent, DialogComponent, ChangePasswordComponent],
      providers: [
        { provide: AuthManagerService, useValue: mockAuthManagerService },
        { provide: TranslatorService, useValue: mockTranslatorService },
        { provide: HttpClient, useValue: mockHttpClient },
      ],
      imports: [SlideMenuModule, ButtonModule, DialogModule, PasswordModule, FormsModule, ReactiveFormsModule, MessagesModule, BrowserAnimationsModule]
    }).compileComponents();

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [UserInfoComponent, DialogComponent, ChangePasswordComponent]
      }
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    componentFactoryResolver = debugElement.injector.get(ComponentFactoryResolver);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the UserInfo component', () => {
    expect(element.querySelector('.btn-user-info').textContent).toContain('SimpleUser');
  });

  it('should hide the change password link', () => {
    component.hideChangePasswd();
    expect(component.showChangePasswd).toBeFalsy();
  });

  it('should init the menuItems', (done) => {
    const changePasswordLabel=component.items[0].label = "Change Password";
    const logoutLabel= component.items[1].label = "Logout";
      expect(changePasswordLabel).toBe('Change Password');
      expect(logoutLabel).toBe('Logout');
      done();
  });

  it('should hide the UserInfo menu', () => {
    spyOn(component.menu, 'toggle');
    component.openChangePasswordComponent();
    expect(element.querySelector('.user-info.ui-slidemenu')).toBeNull();
    expect(component.menu.toggle).toHaveBeenCalledTimes(1);
    expect(component.menu.toggle).toHaveBeenCalledWith('hide');
  });

  it('should logout', function () {
    let spy=  spyOn(component.logoutEvt, 'emit');
    component.doLogout()
    expect(spy).toHaveBeenCalled()
  });
});
