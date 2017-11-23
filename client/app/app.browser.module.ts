import {NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';


@NgModule({
  imports: [
    AppModule,
    BrowserAnimationsModule,
    ModuleMapLoaderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
