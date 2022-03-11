import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancialSummaryPageRoutingModule } from './financial-summary-routing.module';

import { FinancialSummaryPage } from './financial-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinancialSummaryPageRoutingModule
  ],
  declarations: [FinancialSummaryPage]
})
export class FinancialSummaryPageModule {}
