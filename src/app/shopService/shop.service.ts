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
  // @Output() event = new EventEmitter();
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  // data: Product[] = this.getProducts();
  // ];
 
  item: any;
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
  
  // data: Product[] = [
  //   { id: 0, name: 'Pizza Salami', price: 8.99, amount: 0 },
  //   { id: 1, name: 'Pizza Classic', price: 5.49, amount: 0 },
  //   { id: 2, name: 'Sliced Bread', price: 4.99, amount: 0 },
  //   { id: 3, name: 'Salad', price: 6.99, amount: 0 }
  productList(): Observable<any> {
    return this.http.get('http://localhost/UDCIDO/api/get_products.php');
  }
  
  // getProducts() {
  //   return this.data;
  // }
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
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
      if (p.id === product.id) {
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
      if (p.id === product.id) {
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
}
