import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeasonListComponent } from '../Seasons/seasonList.component';
import { LocationListComponent } from '../Locations/locationList.component';
import { DashboardComponent } from '../Dashboard/dashboard.component';
import { PageNotFoundComponent } from '../Dashboard/not-found.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'seasons', component: SeasonListComponent},
    { path: 'locations', loadChildren: 'app/Locations/location.module#LocationModule', data: { preload: true }},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
