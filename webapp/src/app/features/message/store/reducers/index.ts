import { ActionReducerMap } from '@ngrx/store'
import * as fromForm1 from '../../form-1/store'
import * as fromMessagelist from '../../messagelist/store'
import * as fromViewMessage from '../../view-message/store'
import * as fromRoot from '@core/store'
/**
 * NGRX State interface for the `Message` feature
 */
export interface MessageState {
  /**
   * The NGRX State for the `Form1` screen component
   */
  Form1: fromForm1.State
  /**
   * The NGRX State for the `Messagelist` screen component
   */
  Messagelist: fromMessagelist.State
  /**
   * The NGRX State for the `ViewMessage` screen component
   */
  ViewMessage: fromViewMessage.State
}
/**
 * NGRX reducers for the `Message` feature
 */
export const reducers: ActionReducerMap<MessageState, any> = {
  /**
   * The NGRX Reducer for the `Form1` screen component
   */
  Form1: fromForm1.reducer,
  /**
   * The NGRX Reducer for the `Messagelist` screen component
   */
  Messagelist: fromMessagelist.reducer,
  /**
   * The NGRX Reducer for the `ViewMessage` screen component
   */
  ViewMessage: fromViewMessage.reducer,
}
