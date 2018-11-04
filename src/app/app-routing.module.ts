import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'pages', loadChildren: 'src/app/pages/pages.module#PagesModule' },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '*', redirectTo: 'pages' },
];

/**
 * Entire app routing is done through here.
 * There is pages routing module which routing to the pages in the application.
 * Routing to other pages liek 404 etc is done from here
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
