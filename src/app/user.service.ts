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
    body = body.set('password', password);
    return this.http.post('http://localhost/UDCIDO/api/login.php', body);
  }
  regisDB(username: string, password: string, phone: string, address: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    body = body.set('address', address);
    body = body.set('phone', phone);
    return this.http.post('http://localhost/UDCIDO/api/register.php', body);
  }
}
