import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIoConfig, NgIoModule } from 'ng-io';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import { LoginComponent } from './login/login.component';

export const socketConfig: NgIoConfig = {url: 'http://localhost:4000'};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    NgIoModule.forRoot(socketConfig),
    SharedModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'test-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ], {initialNavigation: 'enabled'}),
  ],
})
export class AppModule {}
