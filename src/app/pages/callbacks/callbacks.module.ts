import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticlesModule } from 'angular-particle';

import { DataRoutingModule } from './callbacks-routing.module';
import { ThemeModule } from '../../theme/theme.module';
import { CallbacksComponent } from './callbacks.component';
import { GoogleComponent } from './google/google.component';

/**
 * PAGES has the list of pages in the callback module
 */
const PAGES = [
  CallbacksComponent,
  GoogleComponent,
]

/**
 * data module encapsulates the data related acivities of the application
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ParticlesModule,

    DataRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...PAGES
  ]
})
export class CallbacksModule { }
