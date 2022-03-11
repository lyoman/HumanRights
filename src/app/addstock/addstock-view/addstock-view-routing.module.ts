import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstockViewPage } from './addstock-view.page';

const routes: Routes = [
  {
    path: '',
    component: AddstockViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstockViewPageRoutingModule {}
