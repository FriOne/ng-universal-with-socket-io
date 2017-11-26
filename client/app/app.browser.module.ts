import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
