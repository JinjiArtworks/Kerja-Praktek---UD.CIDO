import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cartService/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  idproducts = 0;
  username: string = '';
  products = [];

  constructor(private cs: CartService,private route:ActivatedRoute, public st: Storage) {}
  listCart() {
    this.cs.cartList(this.username).subscribe((data) => {
      this.products = data;
    });
  }

  
  async ngOnInit() {
    this.username = await this.st.get('username')
    this.listCart();
  }
}

