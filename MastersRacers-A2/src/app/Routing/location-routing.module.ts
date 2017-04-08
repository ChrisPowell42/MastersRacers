import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationListComponent } from '../Locations/locationList.component';
import { LocationDefaultComponent } from '../Locations/locationDefault.component';
import { LocationEditComponent } from '../Locations/locationEdit.component';
import { LocationDetailComponent } from '../Locations/locationDetail.component';

const locationRoutes: Routes = [
  {
    path: '', component: LocationListComponent,
    children: [
        { path: '', component: LocationDefaultComponent },
        { path: ':id/detail', component: LocationDetailComponent },
        { path: ':id/edit', component: LocationEditComponent },
        { path: 'new', component: LocationEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(locationRoutes)],
  exports: [RouterModule],
})
export class LocationRoutingModule { }
