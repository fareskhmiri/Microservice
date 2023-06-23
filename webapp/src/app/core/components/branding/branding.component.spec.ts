import {TestBed, waitForAsync} from '@angular/core/testing';
import {UntypedFormBuilder} from '@angular/forms';

import {BrandingComponent} from "@core/components/branding/branding.component";
import {MainComponent} from "@app/home/home.component";
import {AuthManagerService} from "@services/auth/auth-manager.service";
import {NO_ERRORS_SCHEMA} from "@angular/compiler";

describe('ChangePasswordComponent', () => {
  let component: BrandingComponent;
  let mockHttp;
  const formBuilder = new UntypedFormBuilder();

  beforeEach(waitForAsync(() => {
    let mockAuthManagerService = {
      isUserRolesHas: () => true,
      logout: () => true,
      getUserName: () => 'SimpleUser',
    };
        TestBed.configureTestingModule({
        declarations: [MainComponent],
        providers: [
          { provide: AuthManagerService, useValue: mockAuthManagerService },


        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();


    mockHttp = jasmine.createSpyObj('mockHttp', ['post']);
    component = new BrandingComponent(new Document(),null);

  }));






});
