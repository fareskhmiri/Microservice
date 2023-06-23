import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from "@angular/core";
import {By} from "@angular/platform-browser";
import {HttpClient} from '@angular/common/http';
import {DecimalPipe} from '@angular/common';

import {ProfileService} from '@app/core/services/profile/profile.service';
import {NumberPipe} from './number.pipe';
import {environment} from '@env/environment';

const LOCALE_ID = `${environment.prefix}_locale_id`;

@Component({
    template: `<div> {{ value | numberPipe }} </div>`
})
class TestNumberPipeComponent {
    value;
}

describe('Number Pipe', () => {

    let fixture: ComponentFixture<TestNumberPipeComponent>;
    let component: TestNumberPipeComponent;
    let divElement: Element;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestNumberPipeComponent, NumberPipe],
            providers: [
                DecimalPipe,
                ProfileService,
                { provide: HttpClient, useValue: {} },
            ]
        });
        fixture = TestBed.createComponent(TestNumberPipeComponent);
        component = fixture.componentInstance;
        divElement = fixture.debugElement.query(By.css('div')).nativeElement;
        localStorage.setItem(LOCALE_ID, 'en');
    });

    it('should return an empty string in case of null value', () => {
        fixture.detectChanges();
        expect(divElement.textContent.trim()).toBe('');
    });

    it('should return the formatted value', () => {
        component.value = 2000500;
        fixture.detectChanges();
        expect(divElement.textContent.trim()).toBe('2,000,500');
    });


    describe(' return the formatted value when valid number is provided', () => {

      let numberPipe: NumberPipe ;
      let profileService: ProfileService ;
       beforeEach(async(() => {
         profileService = TestBed.get(ProfileService);
         numberPipe = new NumberPipe(new DecimalPipe("fr"),profileService)
      }));


      it('should return the formatted value ', function () {
        expect(numberPipe.transform(45,undefined,undefined,undefined,undefined)).toBe("45")
      });
      it('should return the formatted value when useDecimals is true ', function () {
        expect(numberPipe.transform(1,true,"","","left")).toBe("1")
      });
      it('should return the formatted value when symbol is provided ', function () {
        expect(numberPipe.transform(20,true,"$","0","left")).toBe("20 $")
      });
      it('should count decimals ', function () {
        expect(numberPipe.countDecimals(45)).toBe(0)
      });
    });

});
