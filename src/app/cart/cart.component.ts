import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cartService/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  idproducts = 0;
  username: string = '';
  products = [];
  price=0;
  quantity:number = 0;
  idkategori:number = 0;

  constructor(private cs: CartService,private route:ActivatedRoute, public st: Storage) {}
  listCart() {
    this.cs.cartList(this.username).subscribe((data) => {
      this.products = data;
    });
  }
  async ngOnInit() {
    await this.st.create();
    this.username = await this.st.get('username');
    this.idkategori = await this.st.get('idkategori');
    this.price = await this.st.get('price');
    this.idproducts = await this.st.get('idproduct');
    

    this.listCart();
  }
}

