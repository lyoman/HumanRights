import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellstockPageRoutingModule } from './sellstock-routing.module';

import { SellstockPage } from './sellstock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellstockPageRoutingModule
  ],
  declarations: [SellstockPage]
})
export class SellstockPageModule {}
