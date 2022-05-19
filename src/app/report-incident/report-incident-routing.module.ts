import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportIncidentPage } from './report-incident.page';

const routes: Routes = [
  {
    path: '',
    component: ReportIncidentPage
  },
  {
    path: 'report-incident-new',
    loadChildren: () => import('./report-incident-new/report-incident-new.module').then( m => m.ReportIncidentNewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportIncidentPageRoutingModule {}
