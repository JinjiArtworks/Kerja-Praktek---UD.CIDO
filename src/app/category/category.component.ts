import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CategoryService } from '../categoryService/category.service';
import { ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CatModalPage } from '../pages2/cat-modal/cat-modal.page';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  constructor(public cs: CategoryService,private route:ActivatedRoute, public st: Storage,private modalCtrl: ModalController) { }
  products = [];
  cart = [];


  username = '';
  kosong = '';
  cartItemCount: BehaviorSubject<number>;
  keyword = "";

  idcategories: number = 0;

  async listCategory() {
    this.cs.categoryList(this.idcategories).subscribe((data) => {
      this.products = data;
    });
  }
  // api untuk masukin keranjang mana yo ? @fitri
  
  searchProduct() {
    this.cs.searchProduct(this.keyword).subscribe((data) => {
      // console.log(data[0]);
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
    this.idcategories =  this.route.snapshot.params['idcategories'];
    this.listCategory();
    this.cart = this.cs.getCart();
    this.cartItemCount = this.cs.getCartItemCount();
  }
  addToCart(product2) {
    console.log(this.username);
    this.cs.addProduct(product2);
    // console.log(product2);
    // this.animateCSS('tada');
  }
  async openCart() {
    // this.animateCSS('bounceOutLeft', true);
    let modal = await this.modalCtrl.create({
      component: CatModalPage,
      cssClass: 'cat-modal'
    });
    modal.present();
  }
  

}
