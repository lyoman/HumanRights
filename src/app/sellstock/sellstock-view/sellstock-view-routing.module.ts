import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellstockViewPage } from './sellstock-view.page';

const routes: Routes = [
  {
    path: '',
    component: SellstockViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellstockViewPageRoutingModule {}
