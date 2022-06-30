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
  no_order:number = 0;
  idcategories: number = 0;
  quantity:number = 0;
  price:number = 0;

  listProduct() {
    this.sh.productList().subscribe((data) => {
      this.products = data;
    });
  }

  productConfirm() {
    this.st.set("price", this.products["price"]);
    this.navCtrl.navigateRoot('/cart');
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

    // this.products = this.sh.getProducts();
    this.cart = this.sh.getCart();
    this.cartItemCount = this.sh.getCartItemCount();
  }
  addToCart(product) {
    this.sh.addProduct(product);
    // this.animateCSS('tada');
  }
 
  async openCart() {
    // this.animateCSS('bounceOutLeft', true);
    let modal = await this.modalCtrl.create({
      component: ShopModalPage,
      cssClass: 'shop-modal'
    });
    // modal.onWillDismiss().then(() => {
    //   this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    //   this.animateCSS('bounceInLeft');
    // });
    modal.present();
  }

}
