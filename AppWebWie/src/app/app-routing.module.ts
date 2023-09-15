import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login', 
        pathMatch: 'full',
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    component: FullComponent,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'ui-components',
    component: FullComponent,
    loadChildren: () =>
      import('./pages/ui-components/ui-components.module').then(
        (m) => m.UicomponentsModule
      ),
  },
  {
    path: 'extra',
    component: FullComponent,
    loadChildren: () =>
      import('./pages/extra/extra.module').then((m) => m.ExtraModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}