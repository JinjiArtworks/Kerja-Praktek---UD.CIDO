import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopModalPage } from './shop-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ShopModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopModalPageRoutingModule {}
