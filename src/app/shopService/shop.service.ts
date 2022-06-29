import { Injectable,EventEmitter,Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  @Output() event = new EventEmitter();

  shops = [];
  item: any;
  constructor(private http: HttpClient) { }

  productList(): Observable<any> {
    return this.http.get('http://localhost/UDCIDO/api/get_products.php');
  }
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
  isAddedToCart(id) {
    return this.shops.some(item => item['id'] == id );
  }
  placeItem(product) {
    this.item = null;
    this.item = product;
  }
  // api untuk deteksi klik button +keranjang dan masuk ke cart
  // insertProduct(username: string): Observable<any> {
  //   let body = new HttpParams();
  //   body = body.set('username', username);
  //   return this.http.post('http://localhost/UDCIDO/api/checkout.php',body);
  // }
  // addProduct(product) {
  //   let added = false;
  //   for (let p of this.shops) {
  //     if (p.id === product.id) {
  //       p.amount += 1; 
  //       added = true;
  //       break;
  //     }
  //   }
  //   if (!added) {
  //     product.amount = 1;
  //     this.shops.push(product);
  //   }
  //   this.itemCount.next(this.itemCount.value + 1);
  // }
 
  // decreaseProduct(product) {
  //   for (let [index, p] of this.shops.entries()) {
  //     if (p.id === product.id) {
  //       p.amount -= 1;
  //       if (p.amount == 0) {
  //         this.shops.splice(index, 1);
  //       }
  //     }
  //   }
  //   this.itemCount.next(this.itemCount.value - 1);
  // }
  userList(username2: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username2', username2)
    return this.http.post('http://localhost/UDCIDO/api/get_profile.php', body);
  }
}
