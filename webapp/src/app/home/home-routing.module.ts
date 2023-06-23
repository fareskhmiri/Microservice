import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from '@core/components/error-404/error-404.component';
import { MainComponent } from '@app/home/home.component';

// palmyra-needle-angular-add-module-dependencies-import Do not delete this line. Palmyra will add new route here

const routes: Routes = [
  // palmyra-needle-angular-add-main-route Do not delete this line. Palmyra will add new route here
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'iframe',
        loadChildren: () => import('../core/components/screen/screen.module').then((m) => m.ScreenModule)
      },
      {
        path: '',
        loadChildren: () => import('../features/features.module').then((m) => m.FeaturesModule)
      },
      {
        path: ':wsId',
        loadChildren: () => import('../features/features.module').then((m) => m.FeaturesModule)
      }
    ]
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
