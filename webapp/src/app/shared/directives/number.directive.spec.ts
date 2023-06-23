import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { DecimalPipe } from '@angular/common';
import { ProfileService } from '@app/core/services/profile/profile.service';
import { HttpClient } from '@angular/common/http';
import { NgControl } from '@angular/forms';
import { NumberFormatterDirective } from './number.directive';
import { NumberPipe } from '../pipes/number.pipe';
import { environment } from "@env/environment";
const LOCALE_ID = `${environment.prefix}_locale_id`;
@Component({
    template: `<input  class="number" type="text" plmNumberFormatter [value]="1000"/>`
})
class TestNumberComponent {
}

describe('Directive: NumberFormatterDirective', () => {

    let fixture: ComponentFixture<TestNumberComponent>;
    let inputEl: DebugElement;
    let numberPipe;
    beforeEach(() => {
      localStorage.setItem(LOCALE_ID, 'en');
        TestBed.configureTestingModule({
            declarations: [TestNumberComponent, NumberFormatterDirective],
            providers: [
                NumberPipe, DecimalPipe, ProfileService,
                { provide: HttpClient, useValue: {} },
                { provide: NgControl, useValue: { control: { value: 500, setValue: () => { } } } }
            ]
        });
        fixture = TestBed.createComponent(TestNumberComponent);
        inputEl = fixture.debugElement.query(By.css('input'));
        numberPipe = TestBed.inject(NumberPipe);
    });

    describe('focus event', () => {
        it('should set the value from the control', () => {
            inputEl.triggerEventHandler('focus', { target: { value: null } });
            expect(inputEl.nativeElement.value).toBe('500');
        });
    });

    describe('blur event', () => {
        it('should apply the currency pipe', () => {
            spyOn(numberPipe, 'transform').and.returnValue('2,000');
            inputEl.triggerEventHandler('blur', { target: { value: 2000 } });
            expect(inputEl.nativeElement.value).toBe('2,000');
        });
    });

});
