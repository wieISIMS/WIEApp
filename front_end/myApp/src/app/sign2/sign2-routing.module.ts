import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sign2Page } from './sign2.page';

const routes: Routes = [
  {
    path: '',
    component: Sign2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sign2PageRoutingModule {}
