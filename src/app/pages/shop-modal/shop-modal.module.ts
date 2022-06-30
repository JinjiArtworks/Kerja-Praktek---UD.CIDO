import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopModalPageRoutingModule } from './shop-modal-routing.module';

import { ShopModalPage } from './shop-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopModalPageRoutingModule
  ],
  declarations: [ShopModalPage]
})
export class ShopModalPageModule {}
