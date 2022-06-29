import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shopService/shop.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  constructor(public sh: ShopService,public navCtrl: NavController, public st:Storage) { }
  products = [];
  kosong = '';
  keyword = "";
  username = "";
  no_order:number = 0;
  idcategories: number = 0;
  quantity:number = 0;
  price:number = 0;

  listProduct() {
    this.sh.productList().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  productConfirm() {
    this.st.set("price", this.products["price"]);
      
    this.navCtrl.navigateRoot('/cart');
  }
  // increaseCartItem(product) {
  //   this.sh.addProduct(product);
  // }
  // decreaseCartItem(product) {
  //   this.sh.decreaseProduct(product);
  // }

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
    console.log(this.products);
    // console.log(this.products);
  }

}
