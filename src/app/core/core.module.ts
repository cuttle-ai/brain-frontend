import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { SessionService, ConfigService, HttpService } from './services';
import { HttpClientModule } from '@angular/common/http';

const SERVICES = [
  SessionService,
  ConfigService,
  HttpService,
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
  ],
  providers: [
    ...SERVICES,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: CoreModule,
      providers: [
        ...SERVICES,
      ]
    }
  }
}
