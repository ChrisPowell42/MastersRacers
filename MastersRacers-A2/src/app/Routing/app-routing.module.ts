import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeasonListComponent } from '../Seasons/seasonList.component';
import { DashboardComponent } from '../Dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'seasons', component: SeasonListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
