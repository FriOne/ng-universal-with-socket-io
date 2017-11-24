import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIoConfig, NgIoModule } from 'ng-io';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const socketConfig: NgIoConfig = {url: 'http://localhost:4000'};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    NgIoModule.forRoot(socketConfig),
    BrowserModule.withServerTransition({appId: 'test-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ]),
  ],
})
export class AppModule {}
