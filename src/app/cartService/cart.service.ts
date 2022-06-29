import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = [];

  addItem(product:Product) {
    const exists = this.cartItems.find(item => {
      return item.id === product.idproduct;
    });

    if(exists)
      exists.quantity
    else
      this.cartItems.push(product);
      
      console.log(this.cartItems)
  }
  
  constructor(private http: HttpClient) { }
  cartList(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username',username);
    return this.http.post('http://localhost/UDCIDO/api/get_order_detail.php',body); 
    // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  }
}
