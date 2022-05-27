import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  userList(username:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username)
    return this.http.post('http://localhost/UDCIDO/api/get_profile.php', body);
  }
}
