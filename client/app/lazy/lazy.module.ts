import {NgModule, Component} from '@angular/core'
import {RouterModule} from '@angular/router'
import { SocketIo } from 'ng-io';

@Component({
  selector: 'lazy-view',
  template: `<h3 (click)="onClick()">i'm lazy</h3>`
})
export class LazyComponent {

  constructor(
    private socket: SocketIo
  ) {}

  onClick() {
    this.socket.emit('test', {test: 'Socket!'});
  }
}

@NgModule({
  declarations: [LazyComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyComponent, pathMatch: 'full'}
    ])
  ]
})
export class LazyModule {}
