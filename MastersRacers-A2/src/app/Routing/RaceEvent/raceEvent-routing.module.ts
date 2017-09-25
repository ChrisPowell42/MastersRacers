import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaceEventListResolver } from './raceEventList-resolver.service';
import { RaceFormatListResolver } from '../RefData/raceFormatList-resolver.service';
import { RaceEventResolver } from './raceEvent-resolver.service';
import { ActiveSeasonResolver } from '../Season/activeseason-resolver.service';
import { LocationListResolver} from '../Location/locationList-resolver.service';

import { RaceEventListComponent } from '../../race-events/race-event-list/race-event-list.component';
import { RaceEventDefaultComponent } from '../../race-events/race-event-default/race-event-default.component';
import { RaceEventDetailComponent } from '../../race-events/race-event-detail/race-event-detail.component';
import { RaceEventEditComponent } from '../../race-events/race-event-edit/race-event-edit.component';

const eventRoutes: Routes = [
    {
        path: 'raceevents', component: RaceEventListComponent, resolve: { raceEventList: RaceEventListResolver,
                                                                          activeSeason: ActiveSeasonResolver },
        children: [
            { path: '', component: RaceEventDefaultComponent, data: {shouldDetach: true}},
            { path: 'edit/:id', component: RaceEventEditComponent, resolve: { detailEvent: RaceEventResolver, 
                                                                              raceFormats: RaceFormatListResolver,
                                                                              locations: LocationListResolver,
                                                                              season: ActiveSeasonResolver }},
            { path: 'detail/:id', component: RaceEventDetailComponent, resolve: { detailRaceEvent: RaceEventResolver }}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(eventRoutes)],
    exports: [RouterModule]
})
export class RaceEventRoutingModule { }
