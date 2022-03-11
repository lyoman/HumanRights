import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellstockNewPageRoutingModule } from './sellstock-new-routing.module';

import { SellstockNewPage } from './sellstock-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellstockNewPageRoutingModule
  ],
  declarations: [SellstockNewPage]
})
export class SellstockNewPageModule {}
