import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportIncidentNewPageRoutingModule } from './report-incident-new-routing.module';

import { ReportIncidentNewPage } from './report-incident-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReportIncidentNewPageRoutingModule
  ],
  declarations: [ReportIncidentNewPage]
})
export class ReportIncidentNewPageModule {}
