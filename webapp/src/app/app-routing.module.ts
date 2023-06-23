import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService } from '@services/auth-guard/auth-guard.service'
import { LoginComponent } from './auth/login/login.component'
import { appRoutes } from './custom-app-routes'

const routes: Routes = [
  ...appRoutes,
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () =>
      import('@app/home/home.module').then((m) => m.MainModule),
    canActivate: [AuthGuardService],
  },
]

/**
 * Main routing module for the whole application
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
