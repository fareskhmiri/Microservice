import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { camelCase, startCase, upperFirst, isEmpty } from 'lodash';
import { map, filter } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';

import { environment } from '@env/environment';
import { PrimeNGConfig } from 'primeng/api';

const LOCALE_ID = `${environment.prefix}_locale_id`;
/**
 * A class that provides the user's profile informations such as language, formatting options...etc
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyTranslatorService extends TranslatorService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: TranslatorService, useClass: MyTranslatorService }
  ]
 ```
 * */
@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  MENU_ITEMS = 'Menu Items.';
  LABELS = 'Labels.';

  constructor() {}
  translate = inject(TranslateService)
  config = inject(PrimeNGConfig)
  /**
   * Capitalizes the provided `word`
   * @param word
   * @returns {string}
   */
  private capitalizeWord(word: string): string {
    return startCase(camelCase(word));
  }
  /**
   * Translates the fields
   * @param modelName
   * @param fieldName
   * @returns {string}
   */
  translateField(modelName, fieldName) {
    if (fieldName) {
      this.translate.get('Definitions.' + modelName + '.' + fieldName).subscribe((res) => {
        fieldName = !res.includes('Definitions.') ? res : '';
      });
      return fieldName;
    }
    return '';
  }
  /**
   * Translates dynamic values such as inline labels
   * @param value
   * @param key
   * @returns {Observable}
   */
  getDynamicValues(value, key) {
    return this.translate.get(`DynamicValues.${key}.${value}`);
  }
  /**
   * Translates the messages
   * @param message
   * @returns {Observable}
   */
  getMessage(message: string, args?: any) {
    return this.translate
      .get('Messages.' + message, args || null)
      .pipe(map((res: string) => (!res.includes('Messages.') ? res : message)));
  }
  /**
   * Translates the primeng components' labels
   * @param message
   * @returns {Observable}
   */
  getPrimengLabel(message: string, args?: any) {
    let result = message;
    this.translate
      .get('Primeng.' + message, args || null)
      .pipe(filter((data) => !isEmpty(data)))
      .subscribe((res: string) => (!res.includes('Primeng.') ? (result = res) : message));
    return result;
  }
  /**
   * Translates the enumeration values
   * @param value
   * @param enumerationName
   * @returns {string}
   */
  translateEnumItem(value: any, enumerationName: any): string {
    if (value !== undefined && value !== null) {
      this.translate.get('Enumeration.' + enumerationName + '.' + value).subscribe((res) => {
        value = !res.includes('Enumeration.') ? res : value;
      });
      return value;
    }
    return '';
  }
  /**
   * Tanslates the possible value
   * @param enumPossibleValuesList
   * @param enumerationName
   * @param item
   */
  translateEnumItems(fieldsPossibleValuesList: Item[], enumerationName: string, item: string) {
    this.translate.get('Enumeration.' + enumerationName + '.' + item).subscribe((res) => {
      const translateItem = !res.includes('Enumeration.') ? res : upperFirst(item);
      fieldsPossibleValuesList.push({ label: translateItem, value: item });
    });
  }
  /**
   * Loads the enumeration's possible values
   * @param enumPossibleValuesList
   * @param enumeration
   * @param enumName
   * @returns {array}
   */
  loadEnumeration(enumPossibleValues, enumeration, enumName) {
    return Object.values(enumeration)
      .filter((item) => typeof item === 'string')
      .map((item) => this.translateEnumItems(enumPossibleValues, enumName, item.toString()));
  }
  /**
   * Loads the enumeration's possible values
   * @param enumeration
   * @param enumName
   * @returns {array}
   */
  enumValues(enumeration, enumName): Observable<any> {
    return zip(
      ...Object.values(enumeration)
        .filter((item) => typeof item === 'string')
        .map((item) => {
          return this.translate.get('Enumeration.' + enumName + '.' + item).pipe(
            map((res) => {
              const translateItem = !res.includes('Enumeration.')
                ? res
                : upperFirst(item.toString());
              return {
                label: upperFirst(translateItem),
                value: item,
              };
            })
          );
        })
    );
  }
  /**
   * Inits the user 'slanguage
   */
  initLanguage() {
    const lang = localStorage.getItem(LOCALE_ID) || document.documentElement.lang || 'en';
    if (!this.translate.translations || isEmpty(this.translate.translations)) {
      this.translate.reloadLang(lang);
    }
    this.translate.use(lang);
    this.translate.get('Primeng').subscribe((res) => this.config.setTranslation(res));
    localStorage.setItem(LOCALE_ID, lang);
  }
  /**
   * Redirect to user language on login
   */
   applyPreferedLanguage() {
    const currentLang = localStorage.getItem(LOCALE_ID) || document.documentElement.lang || 'en';
    const documentLang = document.documentElement.lang;
    if (environment.production && currentLang !== documentLang) {
      let baseUrl = document.head.baseURI;
      if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
      }
      const path = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
      window.location.replace(path + '/' + currentLang + '/');
    }
  }
}
/**
 * Menu item interface
 */
export interface Item {
  /**
   * The label property
   */
  label: string;
  /**
   * The value property
   */
  value: string;
}
