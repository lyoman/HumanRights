import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellstockViewPageRoutingModule } from './sellstock-view-routing.module';

import { SellstockViewPage } from './sellstock-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellstockViewPageRoutingModule
  ],
  declarations: [SellstockViewPage]
})
export class SellstockViewPageModule {}
