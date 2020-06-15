import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders } from "@angular/compiler/src/core";

import {
  SessionService,
  ConfigService,
  HttpService,
  WebSocketsService,
} from "./services";
import { HttpClientModule } from "@angular/common/http";

const SERVICES = [
  SessionService,
  ConfigService,
  HttpService,
  WebSocketsService,
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [...SERVICES],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...SERVICES],
    };
  }
}
