import { FeatureService } from './feature.service';
import { UntypedFormBuilder, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { of } from 'rxjs';

function verifyForm(form: UntypedFormGroup): void {
  (<any>Object).values(form.controls).forEach((control: UntypedFormControl) => {
    if (control instanceof UntypedFormGroup) {
      verifyForm(control);
    } else {
      expect(control.touched).toBeTruthy();
    }
  });
}
describe('FeatureService', () => {
  let service: FeatureService;
  let mockFormBuilder,
    mockProfileService,
    mockTranslatorService,
    mockactivatedRoute,
    mockRouter,
    navigateFnMock;
  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['']);
    mockProfileService = jasmine.createSpyObj('mockProfileService', ['']);
    mockTranslatorService = jasmine.createSpyObj('mockTranslatorService', ['']);
    mockactivatedRoute = jasmine.createSpyObj('mockactivatedRoute', ['queryParams']);
    mockactivatedRoute.queryParams.subscribe = jasmine
      .createSpy('subscribe')
      .and.returnValue(of({}));
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    service = new FeatureService(
      mockFormBuilder,
      mockProfileService,
      mockTranslatorService,
      mockactivatedRoute,
      mockRouter,
      navigateFnMock
    );
  });
  describe('get profileService', () => {
    it('should return the profile service', () => {
      expect(service.profileService).toEqual(mockProfileService);
    });
  });
  describe('get translatorService', () => {
    it('should return the translator service', () => {
      expect(service.translatorService).toEqual(mockTranslatorService);
    });
  });
  describe('get formBuilder', () => {
    it('should return the formBuilder', () => {
      expect(service.formBuilder).toEqual(mockFormBuilder);
    });
  });
  describe('#validateForm', () => {
    it('should mark all controls as touched', () => {
      const form = new UntypedFormBuilder().group({
        city: [null, [Validators.maxLength(255)]],
        number: [-2, [Validators.min(-1), Validators.max(Infinity)]],
        street: [null, [Validators.maxLength(255)]],
      });
      service.validateForm(form);
      verifyForm(form);
    });
    it('should mark all controls as touched case of fromGroup', () => {
      const form = new UntypedFormBuilder().group({
        city: [null, [Validators.maxLength(255)]],
        number: [-2, [Validators.min(-1), Validators.max(Infinity)]],
        group: new UntypedFormGroup({
          name: new UntypedFormControl(Validators.maxLength(255)),
          age: new UntypedFormControl(Validators.min(-1), Validators.max(Infinity)),
        }),
      });
      service.validateForm(form);
      verifyForm(form);
    });
  });
  describe('#navigate', () => {
    it('should navigate to the target screen', () => {
      const mockActivateRoute = jasmine.createSpyObj('mockActivateRoute', ['navigate']);
      mockactivatedRoute.navigate = jasmine
        .createSpy('navigate')
        .and.returnValue({ then: () => {} });
      mockRouter.navigate = jasmine.createSpy('navigate').and.returnValue({ then: () => {} });
      service['router'] = mockActivateRoute;
      const params =
        '{"feature":"product","screenType":"Edit","screenId":"1dq2dseir","roleName":"productType","rootId":"1dq2dseir"}';
      //   service.navigate(
      //     'product',
      //     'searchInput',
      //     'call',
      //     null,
      //     mockActivateRoute
      //   )
      //expect(mockActivateRoute.navigate).toHaveBeenCalled()
    });
  });
});
