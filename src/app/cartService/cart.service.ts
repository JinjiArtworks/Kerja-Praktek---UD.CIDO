import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
    cartListItems = [];
  // cartItems = [];
  // items: Product[] = [];
  // addToCart(product: Product) {
  //   this.items.push(product);
  // }
  // getItems() {
  //   return this.items;
  // }

  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }

  // itemsCount(){
  //   return this.items.length;
  // }
  // addItem(product:Product) {
  //   const exists = this.cartItems.find(item => {
  //     return item.id === product.idproduct;
  //   });

  //   if(exists)
  //     exists.quantity
  //   else
  //     this.cartItems.push(product);
      
  //     console.log(this.items)
  // }

  addProductToCart(product:Product) {
    const productExistInCart = this.cartListItems.find(({name}) => name === product.namaProduk); // find product by name
    if (!productExistInCart) {
      this.cartListItems.push({name: product.namaProduk, num:1}); 
      // enhance "porduct" opject with "num" property
      return;
    }
    productExistInCart.num += 1;
  }
  
  constructor(private http: HttpClient) { }
  cartList(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username',username);
    return this.http.post('http://localhost/UDCIDO/api/get_order_detail.php',body); 
    // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  }
}
