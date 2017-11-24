import { Component, OnInit } from '@angular/core';
import { SocketIo } from 'ng-io';

@Component({
  selector: 'home',
  template: `<h3>{{ message }}</h3>`
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(
    private socket: SocketIo
  ) {}

  ngOnInit() {
    this.message = 'Hello';
  }
}
