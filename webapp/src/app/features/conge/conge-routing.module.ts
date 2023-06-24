import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ScreenDialogComponent } from '@shared/components/screen-dialog/screen-dialog.component'
import { AuthGuardService } from '@app/core/services/auth-guard/auth-guard.service'
import { customRoutes } from './custom-conge-routing.module'
// palmyra-needle-angular-add-screen-import Do not delete this line. Palmyra will add import screen here
import { CongeView1Component } from '../conge/view-1/conge-view-1.component'

import { CongeListcongeComponent } from '../conge/listconge/conge-listconge.component'

import { CongeAddCongeComponent } from '../conge/add-conge/conge-add-conge.component'

const routes: Routes = [
  ...customRoutes,
  // palmyra-needle-angular-add-screen-route Do not delete this line. Palmyra will add new route here
  {
    path: 'view-1/:id',
    component: CongeView1Component,
  },
  {
    path: 'view-1',
    component: CongeView1Component,
  },

  {
    path: 'listconge',
    component: CongeListcongeComponent,
    children: [
      {
        path: 'conge',
        component: ScreenDialogComponent,
        outlet: 'dialog',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@features/conge/conge.module').then((m) => m.CongeModule),
          },
        ],
      },
      {
        path: 'conge',
        outlet: 'call',
        loadChildren: () =>
          import('@features/conge/conge.module').then((m) => m.CongeModule),
      },
    ],
  },

  {
    path: 'add-conge/:id',
    component: CongeAddCongeComponent,
  },
  {
    path: 'add-conge',
    component: CongeAddCongeComponent,
  },
]

/**
 * The Conge routing module
 *
 * @stable
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongeRoutingModule {}
