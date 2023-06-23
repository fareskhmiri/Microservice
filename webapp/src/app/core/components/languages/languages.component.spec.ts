import { of } from 'rxjs';
import { ProfileService } from '@services/profile/profile.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LanguagesComponent } from './languages.component';
import { Globals } from '@app/core/global/globals';
import { environment } from '@env/environment';
const customProfile = {
  language: 'fr',
  numberFormat: '#,##0.###',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm:ss'
};

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;
  let element: HTMLElement;
  const mockGlobals = {
    languages: ['en']
  };
  let globals = {
    languages: ['en']
  };
  let mockProfileService;
  mockProfileService = jasmine.createSpyObj('mockProfileService', ['get']);
  mockProfileService.get.and.returnValue(of(customProfile));
    beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [LanguagesComponent],
      providers: [{ provide: Globals, useValue: mockGlobals }, {provide: ProfileService, useValue: mockProfileService}]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LanguagesComponent]
      }
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    globals = TestBed.inject(Globals);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  describe('the initial component display', () => {
    it('should hide the language component in case of one configured language', () => {
      fixture.detectChanges()
      expect(component.display).toBeFalsy();
      expect(globals.languages).toEqual(['en']);
      expect(element.querySelector('.plm-change-lang-button')).toBeFalsy();
    });

    it('should display the language component when having more than one configured language', () => {

      globals.languages = ['en', 'fr'];
      fixture.detectChanges();
      expect(component.display).toBeTruthy();
      expect(component.languages.length).toBe(2);
      expect(element.querySelectorAll('.plm-change-lang-button').length).toBe(2);
      const languagesList = element.querySelectorAll('.plm-change-lang-button');
      expect(languagesList.length).toBe(2);
      expect(languagesList[0].textContent.trim()).toEqual('EN');
      expect(languagesList[1].textContent.trim()).toEqual('FR');
      globals.languages = ['en'];
    });
  });
  describe('switchLanguage method', () => {
    it('should change the language in the localstorage', () => {
      const LOCALE_ID = `${environment.prefix}_locale_id`;
      spyOn(component, 'goToTargetApp');
      component.switchLanguage('fr');
      expect(localStorage.getItem(LOCALE_ID)).toEqual('fr');
    });

  });
});
