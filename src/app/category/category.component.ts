import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CategoryService } from '../categoryService/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  constructor(public cs: CategoryService,private route:ActivatedRoute, public st: Storage) { }
  idcategories = 0;
  products = [];
  kosong = '';
  keyword = "";

  listCategory() {
    this.cs.categoryList(this.idcategories).subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }
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
    console.log(this.products);
  }

}
