import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


import { HomeService } from '../HomeService/home.service'
import { ShopService } from '../shopService/shop.service';
@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.scss'],
})
export class HomepagesComponent implements OnInit {
  constructor(public hm: HomeService, private route: Router,private storage: Storage, public sh: ShopService) { }
  products = [];
  categories = [];
  kosong = '';
  username = '';
  keyword = "";
  fill = '';
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
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
        console.log(data);
        // this.kosong = data[0];
      }
    });
  }
  async listProduct() {
    this.hm.productList().subscribe((data) => {
      this.products = data;
    });
  }
  async listCategories() {
    this.hm.kategoriList().subscribe((data) => {
      this.categories = data;
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
  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username')
    this.listProduct();
    this.listCategories();
    console.log(this.username);

    // console.log(this.products);
  }

}
