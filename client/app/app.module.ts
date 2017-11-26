import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgIoConfig, NgIoModule } from 'ng-io';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './modules/shared/shared.module';


export const socketConfig: NgIoConfig = {url: 'http://localhost:4000', connectOnAppLoad: false};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    NgIoModule.forRoot(socketConfig),
    HttpClientModule,
    SharedModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'test-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ], {initialNavigation: 'enabled'}),
  ],
})
export class AppModule {}
