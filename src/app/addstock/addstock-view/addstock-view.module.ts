import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstockViewPageRoutingModule } from './addstock-view-routing.module';

import { AddstockViewPage } from './addstock-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstockViewPageRoutingModule
  ],
  declarations: [AddstockViewPage]
})
export class AddstockViewPageModule {}
