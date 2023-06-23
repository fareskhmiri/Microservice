import { Observable } from 'rxjs';
/**
 * @deprecated 
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Defines the action's lifecyle contract
 *
 * This interface should not be modified.
 */
export interface ActionInterface {
    /**
     * Allowed property
     */
    allowed: boolean;
    /**
     * This method runs first to control or validate the input data
     * @param data
     * @returns {Observable}
     */
    preExecute(data): Observable<any>;
    /**
     * This is the main method that interacts with the REST API
     * @param data
     * @returns {Observable}
     */
    execute(data): Observable<any>;
    /**
     * This method runs after the execute method to display messages
     * @param data
     * @returns {Observable}
     */
    postExecute(data): Observable<any>;
    /**
     * This method is the latest to be executed, it handles the navigation to other screens
     * @param data
     * @returns {Observable}
     */
    navigate(data): Observable<any>;
}
