import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ShopService } from 'src/app/shopService/shop.service';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.page.html',
  styleUrls: ['./shop-modal.page.scss'],
})
export class ShopModalPage implements OnInit {

  constructor(public sh: ShopService,private modalCtrl: ModalController,private alertCtrl: AlertController) { }
  products = [];
  listProduct() {
    this.sh.productList().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit() {
    // this.listProduct();
    this.products = this.sh.getCart();
  }
 
  decreaseCartItem(product) {
    this.sh.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.sh.addProduct(product);
  }
 
  removeCartItem(product) {
    this.sh.removeProduct(product);
  }
 
  getTotal() {
    return this.products.reduce((i, j) => i + j.price * j.amount, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
 
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
