import { Component } from '@angular/core';

import { TransferHttp } from './modules/shared/services/transfer-http';

@Component({
  selector: 'app-root',
  template: `
    <h1>Universal Demo using Angular and Angular CLI</h1>
    <a routerLink="/">Home</a>
    <a routerLink="/lazy">Lazy</a>
    <a routerLink="/lazy/nested">Lazy_Nested</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(private http: TransferHttp) {}

  ngOnInit() {
    this.http.get('http://localhost:4000/api/test').subscribe(response => console.log(response));
  }
}
