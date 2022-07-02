import { Injectable,EventEmitter,Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// export interface Product { 
//   id: number;
//   image:string;
//   product_name: string;
//   product_description: string;
//   amount: number;
//   price: number;
// }
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  searchProduct(keyword: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('keyword', keyword);
    return this.http.post('http://localhost/UDCIDO/api/get_search.php', body);
  }
  shopdetail(idproducts: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idproducts', idproducts);
    return this.http.post('http://localhost/UDCIDO/api/getOneProduct.php', body);
  }
  // yt lesson start
  
  productList(): Observable<any> {
    return this.http.get('http://localhost/UDCIDO/api/get_products.php');
  }
  
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    // console.log(product);
    let added = false;
    for (let p of this.cart) {
      if (p.idproducts === product.idproducts) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.idproducts === product.idproducts) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.idproducts === product.idproducts) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  // yt lesson end
  userList(username2: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username2', username2)
    return this.http.post('http://localhost/UDCIDO/api/get_profile.php', body);
  }

  checkout(idproduct: number, username: string, quantity:number, price:number, subtotal:number): Observable<any> {
    let body2 = new HttpParams();
    body2 = body2.set('username', username);
    body2 = body2.set('idproducts', idproduct);
    body2 = body2.set('product_quantity', quantity);
    body2 = body2.set('product_price', price);
    body2 = body2.set('subtotal', subtotal);
    return this.http.post('http://localhost/UDCIDO/api/checkout.php', body2);
  }
}
