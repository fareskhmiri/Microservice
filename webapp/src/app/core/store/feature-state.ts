import { ActivatedRoute } from '@angular/router';
import { get, set } from 'lodash';
import { stringToHash } from '../utils/app.utility';

import { ScreenContext, buildScreenCtx } from './states';
/**
 * This property is used to get the generic screen identifier
 */
const screenIds = {};
/**
 * Variable that provides the active screens' properties like the activeRoute
 * This is a JS state not loaded in NGRX store because it contains complex
 * Objects like ActiveRoute and other technical properties that are not shared between
 * components
 */
const screensProps = {};
/**
 * The parent active screen's identifier
 */
let parentScreenId: string;
/**
 *
 * @param route
 * @param isSameComponent
 */
export function getScreenId(route: ActivatedRoute, isSameComponent: boolean) {
  if (!isSameComponent) {
    return new Date().getTime().toString(32);
  }
  return stringToHash(getScreenRoutePath(route) || '').toString();
}

/**
 * get the full screen route path from the ActivatedRoute
 * @param route
 */
export function getScreenRoutePath(route: ActivatedRoute) {
  let currentRoute = route.snapshot?.url[0]?.path || '';
  let parentRoute = route.parent;
  while (parentRoute) {
    currentRoute =
      (parentRoute.outlet !== 'primary' ? `:${parentRoute.outlet}/` : '') +
      (currentRoute && parentRoute.snapshot?.url[0]?.path
        ? parentRoute.snapshot?.url[0]?.path + '/' + currentRoute
        : currentRoute);
    parentRoute = parentRoute.parent;
  }
  return currentRoute || '/';
}
/**
 * Inits the properties of the active screen in a local state
 * @param feature
 * @param screen
 * @param id
 * @param activateRoute
 * @param parentCtx
 * @param ignoreDispatchingSelectionByRole
 * @returns {object} Screen's Context
 */
export function initScreen(
  feature: string,
  screen: string,
  id: string,
  activateRoute: ActivatedRoute,
  parentCtx?: ScreenContext,
  ignoreDispatchingSelectionByRole?: boolean
) {
  const properties = screensProps[id] ? { ...screensProps[id] } : {};
  screensProps[id] = {
    ...properties,
    activateRoute,
    ctx: getContext(feature, screen, id, parentCtx, ignoreDispatchingSelectionByRole),
  };
  return screensProps[id].ctx;
}
/**
 *
 * @param screenId checks if screen is already initialized
 * @returns {boolean} isInitialized
 */
export function isInitializedScreen(screenId: string) {
  return screensProps[screenId] != null;
}
/**
 * Inits the properties of the active screen in a local state
 * @param ctx
 * @param rootId
 * @param screenId
 * @param roleName
 * @returns {string} screenId
 */
export function initChildScreen(
  ctx: ScreenContext,
  rootId: string,
  screenId: string,
  roleName: string = undefined
) {
  screensProps[screenId] = {
    parentCtx: {
      ...ctx,
      rootId,
      roleName,
    },
  };
  return screenId;
}
/**
 * Destroy the screen's state
 * @param id
 */
export function destroyScreen(id: string) {
  delete screensProps[id];
}
/**
 * Gets a screen's property from the JS state
 * @param id
 * @param name
 */
export function getScreenProperty(id: string, name: string) {
  return get(screensProps, `${id}.${name}`);
}
/**
 * Gets the screen's activeRoute from the JS state
 * @param id
 */
export function getScreenActiveRoute(id: string) {
  return getScreenProperty(id, 'activateRoute');
}
/**
 * Gets the parent context
 * @param screenId
 * @returns {ScreenContext}
 */
export function getParentContext(screenId: string): ScreenContext {
  return getScreenProperty(screenId, 'parentCtx') || getScreenProperty(parentScreenId, 'ctx');
}
/**
 * Set the parent screen identifier in the local variable
 * @param id
 */
export function setParentScreenId(id: string) {
  parentScreenId = id;
}
/**
 * Set the parent screen identifier in the local variable
 * @param queryParams
 */
export function resetParentScreenId() {
  parentScreenId = undefined;
}
/**
 * Gets the component's state context
 * @param feature
 * @param component
 * @param id
 * @param parentCtx
 * @param ignoreDispatchingSelectionByRole
 * @returns {ScreenContext}
 */
export function getContext(
  feature: string,
  component: string,
  id: string,
  parentCtx?: any,
  ignoreDispatchingSelectionByRole?: boolean
) {
  return {
    ...buildScreenCtx(
      feature,
      component,
      id,
      parentCtx?.roleName ?? undefined,
      parentCtx?.rootId ?? undefined,
      parentCtx && parentCtx.roleName
        ? id + ',' + get(parentCtx, 'ids', parentCtx.screenId)
        : undefined
    ),
    ignoreDispatchingSelectionByRole,
  };
}
/**
 * Gets the root screen context
 * @param context
 * @returns {ScreenContext}
 */
export function getRootScreenContext(context: ScreenContext): ScreenContext {
  const rootId = context?.ids?.split(',').pop() || context.screenId;
  return get(screensProps, `${rootId}.ctx`, context);
}
