import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule } from '@nebular/theme';

import { DataRoutingModule } from './data-routing.module';
import { ThemeModule } from '../../theme/theme.module';
import { DataComponent } from './data.component';
import { ConnectSourcesComponent } from './connect-sources/connect-sources.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { DatasetComponent } from './datasets/dataset/dataset.component';

/**
 * PAGES has the list of pages in the data module
 */
const PAGES = [
  DataComponent,
  ConnectSourcesComponent,
  DatasetsComponent,
  DatasetComponent,
]

/**
 * data module encapsulates the data related acivities of the application
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,

    DataRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...PAGES
  ]
})
export class DataModule { }
