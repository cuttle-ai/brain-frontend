import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

/**
 * Routes has all the routes to the pages component.
 */
const routes: Routes = [
  { path: '', component: PagesComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'data', loadChildren: 'src/app/pages/data/data.module#DataModule' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

/**
 * This module implements the routing of the pages module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
