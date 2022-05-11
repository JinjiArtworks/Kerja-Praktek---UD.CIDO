import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cartService/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  
  products = [];

  constructor(private cs: CartService) {}
 
  ngOnInit() {
  }
}

