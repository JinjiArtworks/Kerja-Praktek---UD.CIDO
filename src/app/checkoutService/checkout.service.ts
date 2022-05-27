import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkoutList(): Observable<any> {
    return this.http.get('http://localhost/UDCIDO/api/get_products.php'); // api masi salah, ngambil data dari order detail dan ditampilkan pada saat sebelum  button checkout ditekan 
    // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  }
}
