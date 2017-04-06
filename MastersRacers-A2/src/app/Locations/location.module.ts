import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { LocationService } from '../Services/location.service';

import { LocationListComponent } from './locationList.component';
import { LocationListItemComponent } from './locationListItem.component';
import { LocationDefaultComponent } from './locationDefault.component';
import { LocationEditComponent } from './locationEdit.component';

import { LocationRoutingModule } from './location-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        LocationRoutingModule
    ],
    declarations: [
        LocationListComponent,
        LocationListItemComponent,
        LocationDefaultComponent,
        LocationEditComponent
    ],
    providers: [ LocationService ]
})
export class LocationModule {}
