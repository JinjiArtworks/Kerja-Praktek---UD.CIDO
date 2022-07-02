import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/categoryService/category.service';
import { ShopService } from 'src/app/shopService/shop.service';

@Component({
  selector: 'app-cat-modal',
  templateUrl: './cat-modal.page.html',
  styleUrls: ['./cat-modal.page.scss'],
})
export class CatModalPage implements OnInit {

  products = [];
  idcategories = 0;

  constructor(public cs: CategoryService,private modalCtrl: ModalController,private alertCtrl: AlertController) { }
  

  ngOnInit() {
    this.products = this.cs.getCart();
    console.log(this.products);
  }
  decreaseCartItem(product) {
    this.cs.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cs.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cs.removeProduct(product);
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
