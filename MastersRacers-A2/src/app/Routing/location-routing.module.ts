import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationListComponent } from '../Locations/locationList.component';
import { LocationDefaultComponent } from '../Locations/locationDefault.component';
import { LocationEditComponent } from '../Locations/locationEdit.component';
import { LocationDetailComponent } from '../Locations/locationDetail.component';
import { LocationResolver } from './location-resolver.service';
import { LocationListResolver } from './locationList-resolver.service';

const locationRoutes: Routes = [
  {
    path: 'locations', component: LocationListComponent, resolve: { locationList: LocationListResolver },
    children: [
      { path: '', component: LocationDefaultComponent, data: {shouldDetach: true}},
      { path: 'edit/:id', component: LocationEditComponent, resolve: { detailLocation: LocationResolver }},
      { path: 'detail/:id', component: LocationDetailComponent, resolve: { detailLocation: LocationResolver }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(locationRoutes)],
  exports: [RouterModule],
})
export class LocationRoutingModule { }
