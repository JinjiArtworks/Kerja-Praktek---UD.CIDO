import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  cartList(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username',username);
    return this.http.post('http://localhost/UDCIDO/api/get_order_detail.php',body); 
    // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  }
}
