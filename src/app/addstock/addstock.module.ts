import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstockPageRoutingModule } from './addstock-routing.module';

import { AddstockPage } from './addstock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstockPageRoutingModule
  ],
  declarations: [AddstockPage]
})
export class AddstockPageModule {}
