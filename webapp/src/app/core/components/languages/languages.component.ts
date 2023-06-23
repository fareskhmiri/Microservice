import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ProfileService } from '@services/profile/profile.service';
import { Globals } from '@core/global/globals';
import { environment } from '@env/environment';
const PROFILE = `${environment.prefix}_profile`;
const LOCALE_ID = `${environment.prefix}_locale_id`;
/**
 * This component displays the list of the available languages and enables the user
 * to swith between them. It will not be displayed in case of having one language.
 *
 * This class should not be modified.
 */
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html'
})
export class LanguagesComponent implements OnInit, OnDestroy {
  /**
   * The languages list
   */
  languages: string[] = [];
  /**
   * The `active` language
   */
  currentLanguage:string = localStorage.getItem(LOCALE_ID) || 'en';
  /**
   * The property that displays or hide the component
   */
  display: boolean;
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor (private globals: Globals, private profileService: ProfileService) { }
  /**
   * Initiliazes the component from the configure languages
   */
  ngOnInit(): void {
    this.languages = this.globals.languages;
    this.display = this.languages ? this.languages.length > 1 : false;
  }
  /**
   * Changes the current language
   * @param language
   * @returns {void}
   */
  switchLanguage(language: string): void {
    if (language !== this.currentLanguage) {
      localStorage.setItem(LOCALE_ID, language);
      this.profileService.get(language).pipe(takeUntil(this.destroy$)).subscribe(data => {
        localStorage.setItem(PROFILE, JSON.stringify(data));
        this.goToTargetApp(language);

      }, error => {
        this.goToTargetApp(language);

      })
    }
  }
  /**
   * Opens the target application according to the selected language
   * @param language
   * @returns {void}
   */
  goToTargetApp(language: String) {
    if (environment.production) {
      let baseUrl = document.head.baseURI;
      if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
      }
      const path = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
      window.location.replace(path + '/' + language + '/');
    } else {
      location.reload();
    }
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
