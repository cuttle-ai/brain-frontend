import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { CoreModule } from './core/core.module';

/**
 * AppHeader has all the app bootstraped into one component
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
