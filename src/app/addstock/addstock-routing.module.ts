import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstockPage } from './addstock.page';

const routes: Routes = [
  {
    path: '',
    component: AddstockPage
  },
  {
    path: 'addstock-new',
    loadChildren: () => import('./addstock-new/addstock-new.module').then( m => m.AddstockNewPageModule)
  },
  {
    path: 'addstock-view/:id',
    loadChildren: () => import('./addstock-view/addstock-view.module').then( m => m.AddstockViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstockPageRoutingModule {}
