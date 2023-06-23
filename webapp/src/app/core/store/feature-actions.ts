import { createAction as ngrxCreateAction } from '@ngrx/store';

export const CALL = '[Navigation] Call';
export const SWITCH = '[Navigation] Switch';
export const FORWARD = '[Navigation] Forward';
export const BACK = '[Navigation] Back';
export const DIALOG = '[Navigation] Dialog';
export const VALIDATE_SCREEN = '[Feature] Validate Screen';
export const UPDATE_RELATION = '[Feature] UpdateRelation';
export const REMOVE_RELATION_ITEM = '[Feature] RemoveRelation';

export const navigateByCallAction = ngrxCreateAction(CALL, (payload) => payload);
export const navigateBySwitchAction = ngrxCreateAction(SWITCH, (payload) => payload);
export const navigateByForwardAction = ngrxCreateAction(FORWARD, (payload) => payload);
export const navigateByBackAction = ngrxCreateAction(BACK, (payload) => payload);
export const navigateByDialogAction = ngrxCreateAction(DIALOG, (payload) => payload);
export const validateScreenAction = ngrxCreateAction(VALIDATE_SCREEN, (payload) => payload);
export const failedAction = ngrxCreateAction('Failed Action', (payload) => payload);
export const emptyAction = ngrxCreateAction('Empty Action', (payload) => payload);
/*
 * NGRX Action to update the state's value of a relation
 */
export const removeRelationAction = ngrxCreateAction(REMOVE_RELATION_ITEM, (payload) => payload);
/**
 * NGRX Action to update the state's value of a relation
 */
export const updateRelationAction = ngrxCreateAction(UPDATE_RELATION, (payload) => payload);
