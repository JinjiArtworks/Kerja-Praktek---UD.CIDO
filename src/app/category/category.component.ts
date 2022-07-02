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
  idcategories = 0;
  products = [];
  kosong = '';
  cartItemCount: BehaviorSubject<number>;
  keyword = "";

  listCategory() {
    this.cs.categoryList(this.idcategories).subscribe((data) => {
      this.products = data;
      console.log(data);
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
  
  addToCart(product2) {
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
    // modal.onWillDismiss().then(() => {
    //   this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    //   this.animateCSS('bounceInLeft');
    // });
    modal.present();
  }
  async ngOnInit() {
    await this.st.create();
    this.idcategories =  this.route.snapshot.params['idcategories'];
    this.listCategory();
    // console.log(this.products);
    
    this.products = this.cs.getCart();
    this.cartItemCount = this.cs.getCartItemCount();
  }
  

}
