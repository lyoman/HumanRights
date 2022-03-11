import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstockNewPage } from './addstock-new.page';

const routes: Routes = [
  {
    path: '',
    component: AddstockNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstockNewPageRoutingModule {}
