import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../Shared/shared.module';

import { RacerListResolver } from '../Routing/Racer/racerList-resolver.service';
import { RacerResolver } from '../Routing/Racer/racer-resolver.service';
import { RaceSeriesListResolver } from '../Routing/RefData/raceSeriesList-resolver.service';

import { RacerRoutingModule } from '../Routing/Racer/racer-routing.module';

import { RacerListComponent } from './racerList.component';
import { RacerDefaultComponent } from './racerDefault.component';
import { RacerListItemComponent } from './racerListItem.component';
import { RacerDetailComponent } from './racerDetail.component';
import { RacerEditComponent } from './racerEdit.component';

@NgModule({
  imports: [
        SharedModule,
        FormsModule,
        MaterialModule,
        RacerRoutingModule
  ],
  declarations: [
    RacerListComponent,
    RacerDefaultComponent,
    RacerListItemComponent,
    RacerDetailComponent,
    RacerEditComponent
  ],
  providers: [
    RacerListResolver,
    RacerResolver,
    RaceSeriesListResolver
  ]
})
export class RacerModule {}
