import { Component, DebugElement, Injector } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

import { ActionPolicyDirective } from './action-policy.directive';

@Component({
  template: `<p-button  label="Create" plmActionPolicy="customer,edit,save"></p-button>`
})
class TestActionPolicyComponent {
}
@Component({
  template: `<p-button label="Create" plmActionPolicy="customer,edit"></p-button>`
})
class WrongFieldPolicyComponent {
}

describe('Directive: ActionPolicyDirective', () => {

  let fixture: ComponentFixture<TestActionPolicyComponent>;
  let componentFixture: ComponentFixture<WrongFieldPolicyComponent>;
  let buttonEl, button: DebugElement;
  let injector: Injector;
  let mockCustomerPolicyService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestActionPolicyComponent, WrongFieldPolicyComponent, ActionPolicyDirective],
      imports: [ButtonModule]
    });

  }));
  beforeEach(() => {

    fixture = TestBed.createComponent(TestActionPolicyComponent);
    buttonEl = fixture.debugElement.query(By.css('p-button'));
    componentFixture = TestBed.createComponent(WrongFieldPolicyComponent);
    button = componentFixture.debugElement.query(By.css('p-button'));
    mockCustomerPolicyService = jasmine.createSpyObj('mockCustomerPolicyService', ['isComponentRestricted']);
    injector = TestBed.inject(Injector);
    spyOn(injector, 'get').and.returnValue(mockCustomerPolicyService);

  });
  describe('hideAction', () => {

    it('should do nothing in case of wrong configuration', () => {
      mockCustomerPolicyService.isComponentRestricted.and.returnValue(true);
      componentFixture.detectChanges();
      expect(button.nativeElement.style.display).toBe('');
    });

    it('should hide the button action', () => {
      mockCustomerPolicyService.isComponentRestricted.and.returnValue(true);
      fixture.detectChanges();
      expect(buttonEl.nativeElement.style.display).toBe('none');
    });

    it('should display the button action', () => {
      mockCustomerPolicyService.isComponentRestricted.and.returnValue(false);
      fixture.detectChanges();
      expect(buttonEl.nativeElement.style.display).toBe('');
    });
  });

});
