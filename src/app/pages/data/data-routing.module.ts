import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './data.component';
import { ConnectSourcesComponent } from './connect-sources/connect-sources.component';

/**
 * routes has the routes for the data module
 */
const routes: Routes = [
  {
    path: '', component: DataComponent,
    children: [
      { path: 'sources', component: ConnectSourcesComponent },
      { path: '', redirectTo: 'sources', pathMatch: 'full' },
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
