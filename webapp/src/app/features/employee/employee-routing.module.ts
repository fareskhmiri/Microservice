import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ScreenDialogComponent } from '@shared/components/screen-dialog/screen-dialog.component'
import { AuthGuardService } from '@app/core/services/auth-guard/auth-guard.service'
import { customRoutes } from './custom-employee-routing.module'
// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { EmployeeSearch1Component } from '../employee/search-1/employee-search-1.component'

import { EmployeeForm1Component } from '../employee/form-1/employee-form-1.component'

const routes: Routes = [
  ...customRoutes,
  // palmyra-needle-angular-add-screen-route Do not delete this line. Palmyra will add new route here
  {
    path: 'search-1',
    component: EmployeeSearch1Component,
  },

  {
    path: 'Form-1/:id',
    component: EmployeeForm1Component,
  },
  {
    path: 'Form-1',
    component: EmployeeForm1Component,
  },
]

/**
 * The Employee routing module
 *
 * @stable
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
