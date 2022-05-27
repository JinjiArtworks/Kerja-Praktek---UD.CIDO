import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shopService/shop.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  constructor(public sh: ShopService,private route:ActivatedRoute) { }
  products = [];
  kosong = '';
  keyword = "";
  idcategories: number = 0;

  listProduct() {
    this.sh.productList().subscribe((data) => {
      this.products = data;
    });
  }
  
  searchProduct() {
    this.sh.searchProduct(this.keyword).subscribe((data) => {
      // console.log(data[0]);
      if(data[0] == "empty")
      {
        this.kosong = data[0];
        // console.log("KOSONG");
        // console.log(this.kosong);
      }
      else if(data[0] != "empty"){
        this.products = data;
        this.kosong = data[0];
        // console.log(data);
        // console.log(this.products);
      }
      
    });
  }


  // item = [];
  async ngOnInit() {
    this.listProduct();

    // console.log(this.products);
  }

}
