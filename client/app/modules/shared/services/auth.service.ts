import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TransferHttp } from './transfer-http';

@Injectable()
export class AuthService {

  constructor(
    private http: TransferHttp,
  ) {}

  login({emailOrUserName, password}): Observable<any> {
    return this.http.post('http://localhost:4000/api/login', {emailOrUserName, password});
  }

  logout({emailOrUserName, password}): Observable<any> {
    return this.http.post('http://localhost:4000/api/logout', {});
  }
}
