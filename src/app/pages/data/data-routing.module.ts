import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './data.component';
import { ConnectSourcesComponent } from './connect-sources/connect-sources.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { DatasetComponent } from './datasets/dataset/dataset.component';

/**
 * routes has the routes for the data module
 */
const routes: Routes = [
  {
    path: '', component: DataComponent,
    children: [
      { path: 'sources', component: ConnectSourcesComponent },
      { path: 'datasets', component: DatasetsComponent },
      { path: 'dataset/:id', component: DatasetComponent },
      { path: '', redirectTo: 'datasets', pathMatch: 'full' },
    ]
  }
];

/**
 * This module implements the routing of the data module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
