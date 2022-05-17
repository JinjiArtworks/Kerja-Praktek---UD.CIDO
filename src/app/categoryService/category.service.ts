import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  categoryList(idcategories: number): Observable<any> {
    let body2 = new HttpParams();
    body2 = body2.set('idcategories',idcategories);
    return this.http.post('http://localhost/UDCIDO/api/getSomeProduct.php',body2);
  }
  searchProduct(keyword: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('keyword', keyword);
    return this.http.post('http://localhost/UDCIDO/api/get_search.php', body);
    // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  }
}
