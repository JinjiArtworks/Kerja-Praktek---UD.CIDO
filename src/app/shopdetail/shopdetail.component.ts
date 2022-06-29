import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CategoryService } from '../categoryService/category.service';
import { CartService } from '../cartService/cart.service';
import { ShopService } from '../shopService/shop.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-shopdetail',
  templateUrl: './shopdetail.component.html',
  styleUrls: ['./shopdetail.component.scss'],
})
export class ShopdetailComponent implements OnInit {

  constructor(public cs: CategoryService, public ss: ShopService, private route:ActivatedRoute, public st: Storage, public cart:CartService) { }
  idproducts = 0;
  products = [];
  kosong = '';
  keyword = "";
  DataArray: Array<any> = [];

  detailProduct() {
    this.ss.shopdetail(this.idproducts).subscribe((data) => {
      this.products = data;
    });
  }
  addToCart(item:Product){
    this.cart.addItem(item);
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
    this.idproducts =  this.route.snapshot.params['idproducts'];
    await this.st.create();
    this.st.set("price", this.products["price"]);
    this.st.set("idProduct", this.products["idproducts"]);
    this.st.set("idkategori", this.products["idcategories"]);
    // this.st.
    this.detailProduct();
    // // // this.DataArray = [[this.idproducts, '2'],['3', '4']]
    // console.log(this.products);
    // // console.log(this.DataArray[0][0]);

  }
}
