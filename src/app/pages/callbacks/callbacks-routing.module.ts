import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbacksComponent } from './callbacks.component';
import { GoogleComponent } from './google/google.component';

/**
 * routes has the routes for the data module
 */
const routes: Routes = [
  {
    path: '', component: CallbacksComponent,
    children: [
      { path: 'google', component: GoogleComponent },
      { path: '', redirectTo: 'google', pathMatch: 'full' },
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
