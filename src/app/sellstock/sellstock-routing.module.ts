import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellstockPage } from './sellstock.page';

const routes: Routes = [
  {
    path: '',
    component: SellstockPage
  },
  {
    path: 'sellstock-new',
    loadChildren: () => import('./sellstock-new/sellstock-new.module').then( m => m.SellstockNewPageModule)
  },
  {
    path: 'sellstock-view',
    loadChildren: () => import('./sellstock-view/sellstock-view.module').then( m => m.SellstockViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellstockPageRoutingModule {}
