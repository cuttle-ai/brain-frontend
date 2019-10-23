import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticlesModule } from 'angular-particle';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ThemeModule } from '../theme/theme.module';
import { NeuronsComponent } from './neurons/neurons.component';
import { DashboardsComponent } from './dashboards/dashboards.component';

/**
 * PAGES has the list of pages in the application
 */
const PAGES = [
  PagesComponent,
  LoginComponent,
  HomeComponent,
  RegisterComponent,
  NeuronsComponent,
  DashboardsComponent,
]

/**
 * Pages are coporated through this module. It does lazy loading of the different pages.
 * It has got its own routing for the same. Though some pages like error page, 404 page etc are 
 * made accessible through the app module
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PagesRoutingModule,
    ThemeModule,
    ParticlesModule,
  ],
  declarations: [
    ...PAGES,
  ]
})
export class PagesModule { }
