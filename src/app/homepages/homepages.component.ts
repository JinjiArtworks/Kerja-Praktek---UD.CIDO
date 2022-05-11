import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { HomeService } from '../HomeService/home.service'
@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.scss'],
})
export class HomepagesComponent implements OnInit {
  constructor(public hm: HomeService, private route: Router) { }
  products = [];
  categories = [];
  kosong = '';

  keyword = "";
  listProduct() {
    this.hm.productList().subscribe((data) => {
      this.products = data;
    });
  }
  listCategories() {
    this.hm.kategoriList().subscribe((data) => {
      this.categories = data;
    });
  }

  searchProduct() {
    this.hm.searchProduct(this.keyword).subscribe((data) => {
      // console.log(data[0]);
      if(data[0] == "empty")
      {
        this.kosong = data[0];
        // console.log("KOSONG");
        // console.log(this.kosong);
      }
      else if(data[0] != "empty"){
        this.products = data;
        this.categories = data;
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
    this.listCategories();
    console.log(this.products);
  }

}
