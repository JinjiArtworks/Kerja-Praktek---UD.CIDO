import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shopService/shop.service';
import { ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ShopModalPage } from '../pages/shop-modal/shop-modal.page';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  constructor(public sh: ShopService,public navCtrl: NavController, public st:Storage,private modalCtrl: ModalController) { }
  products = [];
  cart = [];
  cartItemCount: BehaviorSubject<number>;

  kosong = '';
  keyword = "";
  username = "";

  listProduct() {
    this.sh.productList().subscribe((data) => {
      this.products = data;
    });
  }

  searchProduct() {
    this.sh.searchProduct(this.keyword).subscribe((data) => {
      // console.log(data[0]);
      console.log(data);
      if(data[0] == "empty")
      {
        this.kosong = data[0];
      }
      else if(data[0] != "empty"){
        this.products = data;
        this.kosong = data[0];
      }
});
  }
  async ngOnInit() {

    this.st.create();
    this.username = await this.st.get('username');   
    this.listProduct();
    this.cart = this.sh.getCart();
    this.cartItemCount = this.sh.getCartItemCount();
  }
  addToCart(product2) {
    this.sh.addProduct(product2);
    // console.log(product2);
    // this.animateCSS('tada');
  }
 
  async openCart() {
    let modal = await this.modalCtrl.create({
      component: ShopModalPage,
      cssClass: 'shop-modal'
    });
    modal.present();
  }

}
