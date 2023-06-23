import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { CurrencyFormatterDirective } from './currency.directive';
import { CustomCurrencyPipe } from '../pipes/currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { ProfileService } from '@app/core/services/profile/profile.service';
import { HttpClient } from '@angular/common/http';
import { NgControl } from '@angular/forms';
import { environment } from "@env/environment";
const LOCALE_ID = `${environment.prefix}_locale_id`;

@Component({
    template: `<input  class="number" type="text" plmCurrencyFormatter [value]="1000"/>`
})
class TestCurrencyComponent {
}


describe('Directive: CurrencyFormatterDirective', () => {

    let fixture: ComponentFixture<TestCurrencyComponent>;
    let inputEl: DebugElement;
    let currencyPipe;
    beforeEach(() => {
      localStorage.setItem(LOCALE_ID, 'en');
        TestBed.configureTestingModule({
            declarations: [TestCurrencyComponent, CurrencyFormatterDirective],
            providers: [
                CustomCurrencyPipe,
                CurrencyPipe,
                ProfileService,
                { provide: HttpClient, useValue: {} },
                { provide: NgControl, useValue: { control: { value: 500, setValue: () => {}} } }
            ]
        });
        fixture = TestBed.createComponent(TestCurrencyComponent);
        inputEl = fixture.debugElement.query(By.css('input'));
        currencyPipe = TestBed.inject(CustomCurrencyPipe);
    });

    describe('focus event', () => {
        it('should set the value from the control', () => {
            inputEl.triggerEventHandler('focus', { target: { value: null } });
            expect(inputEl.nativeElement.value).toBe('500');
        });
    });

    describe('blur event', () => {
        it('should apply the currency pipe', () => {
            spyOn(currencyPipe, 'transform').and.returnValue('$2,000');
            inputEl.triggerEventHandler('blur', { target: { value: 2000 } });
            expect(inputEl.nativeElement.value).toBe('$2,000');
        });
    });

});