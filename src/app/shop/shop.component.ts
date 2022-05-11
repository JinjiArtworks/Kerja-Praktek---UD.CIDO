import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ShopService } from '../shopService/shop.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  constructor(public sh: ShopService,private route:Router) { }
  products = [];
  kosong = '';
  keyword = "";

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
  coPage(){
    this.route.navigate(['/checkout']);
  }
  cartPage(){
    this.route.navigate(['/cart']);
  }
  // SLIDERS
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:true,
  }

  // item = [];
  ngOnInit() {
    this.listProduct();
    console.log(this.products);
  }

}
