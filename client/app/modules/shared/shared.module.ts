import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferHttp } from './services/transfer-http';

@NgModule()
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        TransferHttp,
      ]
    };
  }
}
