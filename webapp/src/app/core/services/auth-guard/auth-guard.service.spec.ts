import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuardService } from '@services/auth-guard/auth-guard.service';

describe('Service: AuthGuard', () => {
  let mockMessageService: any, mockInjector: any,
    authGuardService, mockStore, mockRouter, mockCustomerPolicyService, mockAuthManagerService;
  let next = { data: {} };

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    mockRouter = jasmine.createSpyObj('router', ['state', 'navigateByUrl']);
    mockInjector = jasmine.createSpyObj('injector', ['get']);
    mockCustomerPolicyService = jasmine.createSpyObj('CustomerPolicyService', ['isScreenAuthorized']);
    mockMessageService = jasmine.createSpyObj('mockMessageService', ['openErrorMessage']);
    mockAuthManagerService = jasmine.createSpyObj('mockAuthManagerService', ['isLogged']);
    authGuardService = new AuthGuardService(mockRouter, mockInjector, mockMessageService, mockAuthManagerService, mockStore,mockCustomerPolicyService);
  })
  it('should allow the access to `Customer Edit` page for the logged user', () => {
    mockAuthManagerService.isLogged.and.returnValue(true);
    expect(authGuardService.canActivate(<ActivatedRouteSnapshot>next, <RouterStateSnapshot>{ url: '/customer/edit/1' })).toBeDefined();
  });
  it('should not allow the access to `Customer Edit` page for disconnected user', () => {
    mockAuthManagerService.isLogged.and.returnValue(false);
    expect(authGuardService.canActivate(<ActivatedRouteSnapshot>next, <RouterStateSnapshot>{ url: '/customer/edit/1' })).toBeDefined();
  });
  it('should not allow the access to unauthorized screen', () => {
    next = { data: { feature: 'customer', useCase: 'edit' } };
    mockCustomerPolicyService.isScreenAuthorized.and.returnValue(false);
    mockAuthManagerService.isLogged.and.returnValue(false);
    mockInjector.get.and.returnValue(mockCustomerPolicyService);
    expect(authGuardService.canActivate(<ActivatedRouteSnapshot>next, <RouterStateSnapshot>{ url: '/customer/edit/1' })).toBeDefined();
  });
});
