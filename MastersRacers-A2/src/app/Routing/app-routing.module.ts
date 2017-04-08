import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../Dashboard/dashboard.component';
import { PageNotFoundComponent } from '../Dashboard/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'seasons', loadChildren: 'app/Seasons/season.module#SeasonModule', data: { preload: true }},
    { path: 'locations', loadChildren: 'app/Locations/location.module#LocationModule', data: { preload: true }},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
