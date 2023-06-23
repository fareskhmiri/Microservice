import { NgModule } from '@angular/core'

import { EmployeeSearch1Actions } from './employee-search-1.actions'
import { Button04826Action } from './employee-button-04826-search-1.action'
/**
 * @deprecated
 * In the upcoming release, this file will be deleted. If you have any custom code in this file, please move it to the effects file.
 * Module that exports all the actions` services generated from the configured `actions` via `UI Studio` tool.
 */
@NgModule({
  providers: [Button04826Action, EmployeeSearch1Actions],
})
export class EmployeeSearch1ActionsModule {}
