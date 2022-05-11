import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  productList(): Observable<any> {
    return this.http.get('http://localhost/UDCIDO/api/get_products.php');
    // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  }
  searchProduct(keyword: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('keyword', keyword);
    return this.http.post('http://localhost/UDCIDO/api/get_search.php', body);
    // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  }
}
