import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { LocationService } from '../Services/location.service';
import { LocationResolver } from '../Routing/Location/location-resolver.service';
import { LocationListResolver } from '../Routing/Location/locationList-resolver.service';
import { LocationRoutingModule } from '../Routing/Location/location-routing.module';
import { SharedModule } from '../Shared/shared.module';

import { LocationListComponent } from './locationList.component';
import { LocationListItemComponent } from './locationListItem.component';
import { LocationDefaultComponent } from './locationDefault.component';
import { LocationEditComponent } from './locationEdit.component';
import { LocationDetailComponent } from './locationDetail.component';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        MaterialModule,
        LocationRoutingModule
    ],
    declarations: [
        LocationListComponent,
        LocationListItemComponent,
        LocationDefaultComponent,
        LocationEditComponent,
        LocationDetailComponent
    ],
    providers: [ LocationResolver,
                 LocationListResolver ]
})
export class LocationModule {}
