import { Observable, of } from 'rxjs';
import { filter, finalize, switchMap, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ActionInterface } from '@app/core/components/actions/action.interface';
/**
 * @deprecated 
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * A class that launches the execution lifecycle of an action like "Save", "Find"...etc
 *
 * This class should not be modified.
 */
@Injectable({
  providedIn: "root"
})
export class ActionHandler {
  /**
   * Executes the lifecycle of the provided action using the Observable
   * source emitter
   *
   * @param action
   * @param data
   * @returns {Observable}
   */
  perform(action: ActionInterface, data: any): Observable<any> {
    return of(data).pipe(
      filter(() => action.allowed === true),
      tap(() => (action.allowed = false)),
      switchMap(dataPre => action.preExecute(dataPre)),
      switchMap(dataExe => action.execute(dataExe)),
      switchMap(dataPost => action.postExecute(dataPost)),
      switchMap(dataNav => action.navigate(dataNav)),
      finalize(() => (action.allowed = true))
    );
  }
}
