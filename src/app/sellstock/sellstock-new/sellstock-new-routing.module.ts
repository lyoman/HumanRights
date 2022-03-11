import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellstockNewPage } from './sellstock-new.page';

const routes: Routes = [
  {
    path: '',
    component: SellstockNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellstockNewPageRoutingModule {}
