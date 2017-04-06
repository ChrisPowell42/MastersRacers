import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationListComponent } from './locationList.component';
import { LocationDefaultComponent } from './locationDefault.component';
import { LocationEditComponent } from './locationEdit.component';

const locationRoutes: Routes = [
  { 
    path: '', 
    component: LocationListComponent,
    children: [
        { 
            path: '', component: LocationDefaultComponent 
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(locationRoutes)],
  exports: [RouterModule],
})
export class LocationRoutingModule { }
