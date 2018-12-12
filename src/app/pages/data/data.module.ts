import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataRoutingModule } from './data-routing.module';
import { ThemeModule } from '../../theme/theme.module';
import { DataComponent } from './data.component';
import { ConnectSourcesComponent } from './connect-sources/connect-sources.component';

/**
 * PAGES has the list of pages in the data module
 */
const PAGES = [
  DataComponent,
  ConnectSourcesComponent,
]

/**
 * data module encapsulates the data related acivities of the application
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    DataRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...PAGES
  ]
})
export class DataModule { }
