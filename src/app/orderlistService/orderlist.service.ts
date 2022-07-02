import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderlistService {

  constructor(private http: HttpClient) { }
  
  orderList(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post('http://localhost/UDCIDO/api/get_listOrder.php', body);
  }
  
}
