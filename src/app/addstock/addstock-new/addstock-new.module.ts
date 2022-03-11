import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstockNewPageRoutingModule } from './addstock-new-routing.module';

import { AddstockNewPage } from './addstock-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstockNewPageRoutingModule
  ],
  declarations: [AddstockNewPage]
})
export class AddstockNewPageModule {}
