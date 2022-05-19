import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportIncidentNewPage } from './report-incident-new.page';

const routes: Routes = [
  {
    path: '',
    component: ReportIncidentNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportIncidentNewPageRoutingModule {}
