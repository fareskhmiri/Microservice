import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, UntypedFormArray, AbstractControl } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { isEqual, get, camelCase, set } from 'lodash';
import { createAction } from '@ngrx/store';
import { Subject, of } from 'rxjs';
import _ from 'lodash';

import { Calendar } from 'primeng/calendar';
import { TranslatorService } from '@services/translator/translator.service';
import { ProfileService } from '@services/profile/profile.service';
import { NavigationQueueService } from './router.service';
import { getParamValue } from '@app/shared/utils/feature-utils';
/**
 * This utility service is injected in all the screens' components generated by UI Studio tool that provides the following utilities:
 * - access to some global services
 * - patches form's value
 * - navigates to nested routes
 * - downloads a file
 * - builds the context of the screens
 * - WCAG controls
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyFeatureService extends FeatureService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: FeatureService, useClass: MyFeatureService }
  ]
 ```
 * */
@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  /**
   * The last focus element component
   */
  public lastFocusElement: any;
  /**
   * The boolean possible values
   */
   public booleanValues = of([
    { label: $localize`:message;true:True`, value: true },
    { label: $localize`:message;false:False`, value: false },
  ]);
  /**
   * Navigation subject emitter
   */
  private sameNavigation$ = new Subject<void>();
  /**
   * Default  Constructor of the component
   */
  constructor (
    private formBuilderServ: UntypedFormBuilder,
    private profileServ: ProfileService,
    private translatorServ: TranslatorService,
    private router: Router,
    private navigationServ: NavigationQueueService,
    private activeRoute:ActivatedRoute
  ) {};
  /**
   * Get the profile manager service
   * @return {ProfileService}
   */
  get profileService(): ProfileService {
    return this.profileServ;
  }
  /**
   * Get the translator service
   * @return {TranslatorService}
   */
  get translatorService(): TranslatorService {
    return this.translatorServ;
  }
  /**
   * Get angular reactive form builder
   * @return {FormBuilder}
   */
  get formBuilder(): UntypedFormBuilder {
    return this.formBuilderServ;
  }
  /**
   * Validate the form fields
   * @param formGroup
   * @returns {void}
   */
   validateForm(formGroup: UntypedFormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateForm(control);
      } else if (control instanceof UntypedFormArray) {
        (control as UntypedFormArray).controls.forEach((group) => this.validateForm(group as UntypedFormGroup));
      }
    });
  }
  /**
  * Dispatch an action to update the state of the caller
  * by the selected items
  @param selectedItems
  @param params
  @param parentCtx
  @param store
  @returns {void}
  */
  doSelect(selectedItems, params, parentCtx, store) {
    const selectionValue = selectedItems instanceof Array ? [...selectedItems] : selectedItems;
    const roleNameValue = parentCtx.roleName || getParamValue(this.activeRoute,'roleName');
    const data = {
      ...params,
      targetCtx: { ...parentCtx },
      value: selectionValue,
      propertyToModify: roleNameValue,
      overrideValue: true
    };
    const selectionActionNameByRole = parentCtx['ignoreDispatchingSelectionByRole']? '' :  ` ${roleNameValue.replace(/\[(.+?)\]/g, '')}`;
    const selectAction = createAction(
      `[${parentCtx.feature} ${parentCtx.screenType}] Select${selectionActionNameByRole}`,
      payload => payload
    );
    store.dispatch(selectAction(data));
    (this.lastFocusElement as HTMLElement)?.focus();
  }

  /**
 * Navigate to the auxiliary outlets provided as parameter
 * It cleans the default outlets first: call and dialog
 * @param props
 * @param activeRoute
 * @param param
 */
  navigate(
    feature: string,
    screen: string,
    navigationType: string,
    param: string,
    activeRoute: ActivatedRoute,
    params?
  ): void {
    this.navigateTo(
      {
        [navigationType]: null,
      },
      activeRoute,
      param,
      navigationType,
      feature,
      screen,
      params
    ).then(() => {
      this.navigateTo(
        {
          [navigationType]: [
            feature,
            screen,
            {
              screenId: param,
            },
          ],
        },
        activeRoute,
        param,
        navigationType,
        feature,
        screen,
        params
      );
    });
  }
  /**
   * Navigate to a target auxiliary router outlets
   * @param outlets
   * @param activeRoute
   */
  navigateTo(
    outlets: Object,
    activeRoute: ActivatedRoute,
    param: string,
    navigationType: string,
    feature: string,
    screen: string,
    params?
  ): Promise<boolean> {
    return this.router.navigate(
      [
        navigationType === 'switch' ? `/${feature}/${screen}` : './',
        {
          outlets: {
            ...outlets,
          },
        },
      ],
      {
        relativeTo: activeRoute,
        queryParams: {
          fc: crypto.getRandomValues(new Uint32Array(1)),
          ...params
        },
      }
    );
  }
  /*
   * Sequential navigation to sub routes
   * @param {array} commands
   * @param {object} extras
   */
  routerNavigate(commands: any[], extras: NavigationExtras) {
    let outlets = commands[1].outlets;
    Object.keys(outlets).forEach(item => {
      let command = [commands[0], { outlets: { [item]: outlets[item] } }]
      this.navigationServ.navigate(command, extras);
    })
  }

  /**
   * Patches only the distincts form values with the provided data object as input param
   * @param data
   * @param form
   */
  patchValue(data: any, form: UntypedFormGroup) {
    Object.keys(data).forEach((key) => {
      const formControl = form.controls[key];
      if (formControl && (!formControl.value || !isEqual(data[key], formControl.value))) {
        form.controls[key].patchValue(data[key], {
          onlySelf: true,
          emitEvent: true,
        });
      }
    });
    form.updateValueAndValidity();
  }
  /**
   * Set the value of each field in the data
   * @param data
   * @param item
   * @param value
   * */
 setFieldValue(data: any, item: any, value: any) {
    if (item.indexOf('.') != -1) {
      (get(value,camelCase(item.split('.').join(' ')))!= null && get (value,camelCase(item.split('.').join(' ')))!= undefined)  && set(data, item, value[camelCase(item)]);
    } else {
      ((get(value,camelCase(item))!= null && get(value,camelCase(item))!= undefined) || (Object.values(value).every((val:any) => get(value,val) == null)))  && set(data, item, value[camelCase(item)]);
    }
  }

  /**
   * Patches only the filtred value to avoid undefined
   * @param form
   * @param data
   * */
  patchFiltersValue(form: UntypedFormGroup, data: any) {
    data && Object.keys(data).forEach((item) => {
      const result = get(data, item);
      const formControlName= camelCase(item.split('.').join(' '));
      if (result && form.get(formControlName)) {
        form.controls[formControlName].setValue(result);
      }
    });
  }
  /**
   * Dispatch the default criteria into the form
   * @param queryParams
   * @param data
   * @param keys
   * @param form
   * */
  dispatchDefaultValues(criteria,data,form) {
    if (criteria) {
      const regex = /(==|!=|>=|<=|~|>|<)/gi;
      criteria.split('&').forEach((subCriteria) => {
        let values= subCriteria.split('|')
        values.forEach((item, index) => {
          values[index] = item.split(regex)[2].trim().replaceAll("'","").replaceAll('"','');
          let finalValue= values[index];
          const operator= item.split(regex)[1].trim().replaceAll("'","");
          const operatorName=  `${camelCase(subCriteria.split(regex)[0].trim())}Operator`
          try {
            finalValue =  values[index].startsWith('[') ?  JSON.parse(values[index]) : values[index];
          } catch (e) {
            finalValue =  values[index].split("[")[1].split(']')[0].split(',');
          }
          if ( (!Array.isArray(finalValue) )&& (finalValue=='true' || finalValue=='false')) {
            finalValue = finalValue === 'true';
          }
        set(data, camelCase(subCriteria.split(regex)[0].trim()), finalValue)
        set(data, operatorName, operator)
        })
      })
      this.patchFiltersValue(form, data)
    }
}


  /**   
   * Download a file in an iframe   
   * @param res   
   * @param fileName   
   */
  downloadFileInFrame(res: any, fileName: string) {
    const file = this.isBase64(res.body) ? this.convertBase64ToBlobData(res.body, fileName) : this.createFile({ body: res.body }, fileName);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = fileName; document.body.appendChild(link);
    link.click(); document.body.removeChild(link);
  }

  /**
   * Converts a base64 String to Blob
   * @param base64Data
   * @param fileName
   * @param sliceSize
   * @returns {File}
   */
  convertBase64ToBlobData(base64Data: string, fileName: string, sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'text/octet-stream' });
    return this.createFile({ body: blob }, fileName);
  }

  /**
   * Checks whether a string is in base64 format or not
   * @param str
   * @returns
   */
  isBase64(str) {
    if (typeof str !=="string" || str === '' || str.trim() === '') { return false; }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }
  /**
   * sameNavigation
   */
  sameNavigation() {
    this.sameNavigation$.next()
  }
  /**
 * getSameNavigation
 */
  getSameNavigation() {
    return this.sameNavigation$.asObservable();
  }
  /**
   * Create a file for the provided binary content
   * @param res
   * @param uploadFileName
   *
   */
  createFile(res: any, uploadFileName: any): File {
    let file;
    if (!navigator.msSaveBlob) { // detect if not Edge
      file = new File(res ? [res.body] : [], uploadFileName, { type: 'text/octet-stream' });
    } else {
      file = this.blobToFile(new Blob(res ? [res.body] : [], { type: 'text/octet-stream' }), uploadFileName);
    }
    return file;
  }
  /**
   * override primeng calendar behaviour
   * to avoid closing modal after clearing value
   */
  calendarClearValue(){
    Calendar.prototype.onClearButtonClick = function () {
      this.updateModel(null)
      this.updateInputfield()
    }
  }

  /**
   * Get the identifier of the object in edition if it is provided
   * in the parent context or in the URL as path parameter
   * @param parentCtx
   * @param params
   * @returns {string}
   */
  getCode(parentCtx: any, params: any) {
    return parentCtx && parentCtx.code
      ? parentCtx.code
      : this.getParamCode(params);
  }

  /**
   * Sort the options of dropdown, multiselect, autocomplete
   * @param result
   * @param key
   * @param order
  */
  sortOptions(result, key, order){
    return _.orderBy(result, key, order);
  }
  /**
   * Get the identifier from the params provided as input
   * @param params
   * @returns {string}
   */
  private getParamCode(params: any) {
    const id = params.id;
    return id && !id.startsWith('{') ? id : undefined;
  }
  /**
   * Converts Blob object to File object
   * @param blob
   * @param fileName
   * @return {File}
   */
  blobToFile(blob: Blob, fileName: string): File {
    let file: any = blob;
    file.lastModifiedDate = new Date();
    file.name = fileName;
    return file as File;
  }
  /**
    * Gets the action's payload to fire search action in a virtual lazy table
    * @param payload
    * @param pageSize
    * @param first
    * @param totalItems
    * @param orderKeys
    */
  getVirtualLazyPayload(payload: any, pageSize: number, page: number, orderKeys = undefined, criteria= undefined) {
    const actionPayload = { ...payload };
    actionPayload['vars']['page'] = page;
    actionPayload['vars']['size'] = pageSize;
    actionPayload['page']= page;
    if (orderKeys) {
      actionPayload['order'] = orderKeys;
    }
    if (criteria) {
      actionPayload['criteria'] = criteria;
    }
    return actionPayload;
  }
  /**
  * Sets the focus to the provided native element
  * @param element
  * @param value
  */
  setElementFocus(element, value) {
    if (!element.focused && (element.hasOwnProperty('applyFocus') || element.filter)) {
      element.focus();
    } else if (!element.focused || !element.focus) {
      this.setFocus(element, value);
    }
  }
  /**
  * Sets the focus to the provided native element
  * @param element
  * @param value
  */
  setFocus(element, value) {
    (element?.nativeElement?.querySelector(value) as HTMLElement)?.setAttribute('tabindex', '0');
    (element?.nativeElement?.querySelector(value) as HTMLElement)?.focus();
  }

  /**
  * Sets the focus on the first editorCell element of a grid
  * @param event
  */
   clickOnCellEditorElement(event): void {
    let firstCellEditorElement : HTMLElement  = event.srcElement.getElementsByTagName("p-celleditor")[0] as HTMLElement
    firstCellEditorElement.click()
  }

  /**
  * Format file size
  * @param bytes
  */
  formatSize(bytes) {
    if (bytes == 0) {
      return '0 B';
    }
    let k = 1024,
      dm = 3,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  /**
* Deep clones the given AbstractControl, preserving values, validators, async validators, and disabled status.
* @param control AbstractControl
* @returns AbstractControl
*/
  cloneAbstractControl<T extends AbstractControl>(control: T): T {
    let newControl: T;
    if (control instanceof UntypedFormGroup) {
      const formGroup = new UntypedFormGroup({}, control.validator, control.asyncValidator);
      const controls = control.controls;
      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, this.cloneAbstractControl(controls[key]));
      })
      newControl = formGroup as any;
    }
    else if (control instanceof UntypedFormArray) {
      const formArray = new UntypedFormArray([], control.validator, control.asyncValidator);
      control.controls.forEach(formControl => formArray.push(this.cloneAbstractControl(formControl)))
      newControl = formArray as any;
    }
    else if (control instanceof UntypedFormControl) {
      newControl = new UntypedFormControl(control.value, control.validator, control.asyncValidator) as any;
    }
    else {
      throw new Error('Error: unexpected control value');
    }
    if (control.disabled) newControl.disable({ emitEvent: false });
    return newControl;
  }
   /*
   * Sequential navigation to sub routes
   * @param {array} commands
   * @param {object} extras
   */
  queueNavigation(commands: any[], extras: NavigationExtras){
    return  this.navigationServ.navigate(commands, extras);

  }
   /**
   * return the total items number of display grouped
   */
  groupingCounter(value){
    return _.sumBy(value, 'items.length');
  }
  /**
 * Retirive the diffrences from comparator rowData
 * @param {array} fields
 * @param {array} items
 * @returns diffrences
 */
   getComparatorDifferences(fields, items) {
    let result = []
    let diff = []
    items.rowsData && items.rowsData[0].forEach((values, index) => {
      for (let i = 1; i < values.length; i++) {
        if(typeof values[i] !== 'object' ){
          if (values[i] !== values[i - 1]) {
            diff.push(`${fields[index]}`);
            result.push(`${fields[index]}-${i}`);
          }
        }else{
          if (JSON.stringify(values[i]) !== JSON.stringify(values[i - 1])) {
            diff.push(`${fields[index]}`);
            result.push(`${fields[index]}-${i}`);
          }
        }
      }
    })
    diff = [...new Set(diff)]
    return {highlight:result,differenceLine:diff};
  }
}
