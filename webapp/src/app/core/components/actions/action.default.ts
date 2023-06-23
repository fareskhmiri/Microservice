import { Observable, of } from 'rxjs';

import { ActionInterface } from './action.interface';
/**
 * @deprecated 
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Abstract class that is implemented by Actions services like "Save", "Find"...etc
 * It defines the action's lifecyle
 *
 * This class should not be modified.
 */
export abstract class Action implements ActionInterface {
  /**
   * Allowed property, by default true all actions are allowed
   */
  allowed = true;
  /**
   * This method runs first before to control or validate the input data
   * @param data
   * @returns {Observable}
   */
  preExecute(data: any): Observable<any> {
    return of(data);
  }
  /**
   * This is the main method that interacts with the REST API
   * @param data
   * @returns {Observable}
   */
  execute(data: any): Observable<any> {
    return of(data);
  }
  /**
   * This method runs after the execute method to display messages
   * @param data
   * @returns {Observable}
   */
  postExecute(data: any): Observable<any> {
    return of(data);
  }
  /**
   * This method is the latest to be executed, it handles the navigation to other screens
   * @param data
   * @returns {Observable}
   */
  navigate(data: any): Observable<any> {
    return of(data);
  }

}
