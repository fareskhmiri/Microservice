import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuardService } from '@services/auth-guard/auth-guard.service'
import { MainComponent } from './main/main.component'
import { featuresRoutes } from './custom-features-routes'

// palmyra-needle-angular-add-main-screen-import: Do not delete this line
/* Do not write your custom code here, it will be replaced by the generated content */
// end palmyra-needle-angular-add-main-screen-import
const routes: Routes = [
  ...featuresRoutes,
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      // palmyra-needle-angular-add-child-route: Do not delete this line
      {
        path: 'message',
        loadChildren: () =>
          import('./message/message.module').then((m) => m.MessageModule),
      },

      {
        path: 'conge',
        loadChildren: () =>
          import('./conge/conge.module').then((m) => m.CongeModule),
      },

      /* Do not write your custom code here, it will be replaced by the generated content */
      // end palmyra-needle-angular-add-child-route
    ],
  },
]
/**
 * The main routing module for all the `features` modules
 *
 * @stable
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
