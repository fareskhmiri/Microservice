import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { lowerFirst, get, camelCase } from 'lodash';
import { Injectable } from '@angular/core';
import { createAction as ngrxCreateAction } from '@ngrx/store';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';

import * as fromStore from '@app/core/store';
import { selectChangedDataProperty, getScreenId, getRootScreenContext } from '@app/core/store';
import { getParamValue } from '@app/shared/utils/feature-utils';
import {
  ScreenContext,
  DESTROY,
  SHARE_WIDGET_DATA,
  destroyScreen,
  getParentContext,
  isInitializedScreen,
} from '@app/core/store';
/**
 * The base class for all screens supported by `UI Studio` tool:
 * https://wiki.vermeg.com/display/PFD/Components+Store#ComponentsStore-Screens
 *
 * This class should not be modified.
 */
@Injectable()
export class ScreenComponent implements OnInit, OnDestroy {
  /**
   * The unique identifier of the component
   */
  screenId: string;
  /**
   * The unique context identifier
   */
  ctx: ScreenContext;
  /**
   * The caller component's context
   */
  parentCtx: ScreenContext;
  /**
   * The shared parameters
   */
  params: { [key: string]: any } = {};
  /**
   * The routing state that may contains parameters like data shared by the caller component
   */
  state: any = {};
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**
   * The loading Observable
   */
  loading$;
  /**
   * The component's identifier
   */
  id: string;
  /**
   * The configured technical keys
   */
  keys: string;
  /**
   * The JSON data to be handled
   */
  data: any;
  /**
   * The form builder
   */
  form: UntypedFormGroup;

  constructor(
    protected activeRoute: ActivatedRoute,
    protected store: Store<any>,
    protected router: Router
  ) {}
  /**
   * Initiliazes the main properties of the component such as identifier, caller context...etc
   */
  ngOnInit() {
    this.screenId = this.screenId || (
      this.activeRoute.snapshot.params && this.activeRoute.snapshot.params.screenId
        ? this.activeRoute.snapshot.params.screenId
        : getScreenId(this.activeRoute, this.activeRoute.component === this.constructor));
    this.parentCtx = getParentContext(this.screenId);
    this.params = { ...this.defaultParams() };
    this.params = {
      ...this.params,
      workSpaceId: this.router.url.split('/')[1],
    };
    this.state = get(this.router.getCurrentNavigation(), 'extras.state', {});
  }
  /**
   * This method should be implemented in all the components that extend this class to return
   * the feature name and the screen type
   * @return {object}
   */
  getDescriptor() {
    return { feature: 'generic', screen: 'generic' };
  }
  /**
   * The default properties
   */
  defaultParams() {
    return {
      id: this.screenId,
      parent: this.parentCtx,
      loading: false,
      parentCtx: this.parentCtx,
      state: { ...this.state },
    };
  }

  /**
   * @param screenId checks if screen is already initialized
   * @returns {boolean} isInitialized
   */
  isScreenInitialized(screenId: string) {
    return isInitializedScreen(screenId);
  }
  /**
   *  update a widget property value in the state
   * @param value
   * @param widgetName
   * @param widgetProperty
   */
  shareWidgetData(value, widgetName, widgetProperty) {
    this.store.dispatch({
      type:
        '[' + this.ctx.feature + ' ' + lowerFirst(this.ctx.screenType) + '] ' + SHARE_WIDGET_DATA,
      id: this.screenId,
      value: value,
      widgetName: widgetName,
      propertyName: widgetProperty,
    });
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    destroyScreen(this.screenId);
    this.store.dispatch({
      type: '[' + this.ctx.feature + ' ' + lowerFirst(this.ctx.screenType) + '] ' + DESTROY,
      id: this.screenId,
    });
  }
  /**
   * Get parameter value from the activeRoute
   * @param paramKey
   * @returns
   */
  getParamValue(paramKey): boolean {
    return getParamValue(this.activeRoute, paramKey);
  }
  /**
   * Payload Action
   */
  getActionPayload() {
    return {
      ...this.params,
      ctx: { ...this.ctx },
    };
  }
  /**
   * Listen to the changes of the provided propertyName store in the screen's state
   * @param propertyName
   * @param data$
   * @param defaultValue
   * @return {Observable}
   */
  listenToChangedDataProperty(
    propertyName: string,
    data$: Observable<any>,
    defaultValue = []
  ): Observable<any> {
    return this.store.pipe(
      selectChangedDataProperty({
        ...this.ctx,
        propertyName,
        defaultValue,
      }),
      withLatestFrom(data$),
      takeUntil(this.destroy$)
    );
  }
  /**
   * Update the provided data in the screen's state
   * @param data
   * @param action
   * @return {Observable}
   */
  updateDataInState(action: any, data: any, displayScreen = true): void {
    this.store.dispatch(
      action({
        ...this.getActionPayload(),
        data: { ...data },
        displayScreen: displayScreen === false ? undefined : new Date().getTime().toString(32),
      })
    );
  }
  /**
   * Communicate with the parent screen component via dynamic NGRX action
   * @param actionName
   * @param props
   * @return {void}
   */
  callParentAction(actionName: string, props = {}): void {
    if (this.parentCtx) {
      const action = ngrxCreateAction(
        `[${this.parentCtx.feature} ${camelCase(this.parentCtx.screenType)}] ${actionName}`,
        (payload) => payload
      );
      this.store.dispatch(
        action({
          ...this.getActionPayload(),
          ...props,
        })
      );
    }
  }
  /**
   * Gets the data from the state of the parent screen component
   * @param propertyName
   * @return {Observable}
   */
  getDataFromParentState(propertyName: string): Observable<any> {
    return this.store.pipe(
      fromStore.selectData(getRootScreenContext(this?.parentCtx)),
      map((data) => get(data, propertyName)),
      takeUntil(this.destroy$)
    );
  }
  /**
   * True if the control has passed all of its validation tests,
   * false otherwise.
   */
  isFormValid() {
    return this.form?.valid ? true : false;
  }
}
