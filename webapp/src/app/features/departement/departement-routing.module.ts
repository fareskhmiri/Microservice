import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ScreenDialogComponent } from '@shared/components/screen-dialog/screen-dialog.component'
import { AuthGuardService } from '@app/core/services/auth-guard/auth-guard.service'
import { customRoutes } from './custom-departement-routing.module'
// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { DepartementSearch1Component } from '../departement/search-1/departement-search-1.component'

import { DepartementAddDepartmentComponent } from '../departement/add-department/departement-add-department.component'

const routes: Routes = [
  ...customRoutes,
  // palmyra-needle-angular-add-screen-route Do not delete this line. Palmyra will add new route here
  {
    path: 'search-1',
    component: DepartementSearch1Component,
  },

  {
    path: 'Add-department/:id',
    component: DepartementAddDepartmentComponent,
  },
  {
    path: 'Add-department',
    component: DepartementAddDepartmentComponent,
  },
]

/**
 * The Departement routing module
 *
 * @stable
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartementRoutingModule {}
