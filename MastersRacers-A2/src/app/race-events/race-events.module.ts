import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { SharedModule } from '../Shared/shared.module';

import { RaceEventListResolver } from '../Routing/RaceEvent/raceEventList-resolver.service';
import { RaceEventResolver } from '../Routing/RaceEvent/raceEvent-resolver.service';
import { RaceFormatListResolver } from '../Routing/RefData/raceFormatList-resolver.service';
import { ActiveSeasonResolver } from '../Routing/Season/activeseason-resolver.service';
import { RaceEventRoutingModule } from '../Routing/RaceEvent/raceEvent-routing.module';

import { RaceEventListComponent } from './race-event-list/race-event-list.component';
import { RaceEventListItemComponent } from './race-event-list-item/race-event-list-item.component';
import { RaceEventDefaultComponent } from './race-event-default/race-event-default.component';
import { RaceEventDetailComponent } from './race-event-detail/race-event-detail.component';
import { RaceEventEditComponent } from './race-event-edit/race-event-edit.component';

@NgModule({
  imports: [
        SharedModule,
        FormsModule,
        MaterialModule,
        MdNativeDateModule,
        RaceEventRoutingModule
  ],
  declarations: [
    RaceEventListComponent, 
    RaceEventListItemComponent, 
    RaceEventDefaultComponent, 
    RaceEventDetailComponent, 
    RaceEventEditComponent],
  providers: [
    RaceEventListResolver,
    RaceEventResolver,
    RaceFormatListResolver,
    ActiveSeasonResolver
  ]
})
export class RaceEventsModule { }
