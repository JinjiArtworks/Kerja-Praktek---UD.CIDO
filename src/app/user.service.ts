import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  // ionic g service userservice
  loginDB(username: string, password: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('pwd', password);
    return this.http.post('http://localhost:8100/kp/cido/api/login.php', body);
  }
  regisDB(username: string, password: string, phone: string, alamat: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    body = body.set('alamat', alamat);
    body = body.set('phone', phone);
    return this.http.post('http://localhost/UDCIDO/api/register.php', body);
  }
  // searchProduct(keyword: string): Observable<any> {
  //   let body = new HttpParams();
  //   body = body.set('keyword', keyword);
  //   return this.http.post('http://localhost/UDCIDO/api/get_search.php', body);
  //   // return this.http.get('https://ubaya.fun/hmp/week12/product.php');
  // }
}
