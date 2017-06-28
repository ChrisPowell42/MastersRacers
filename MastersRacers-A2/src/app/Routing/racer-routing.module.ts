import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RacerListResolver } from './racerList-resolver.service';
import { RacerResolver} from './racer-resolver.service';
import { RaceSeriesListResolver } from './raceSeriesList-resolver.service';
import { RacerListComponent } from '../Racers/racerList.component';
import { RacerDefaultComponent } from '../Racers/racerDefault.component';
import { RacerDetailComponent } from '../Racers/racerDetail.component';
import { RacerEditComponent } from '../Racers/racerEdit.component';

const racerRoutes: Routes = [
  {
    path: 'racers', component: RacerListComponent, resolve: { racerList: RacerListResolver },
    children: [
      { path: '', component: RacerDefaultComponent, data: {shouldDetach: true}},
      { path: 'edit/:id', component: RacerEditComponent, resolve: { detailRacer: RacerResolver, raceSeries: RaceSeriesListResolver }},
      { path: 'detail/:id', component: RacerDetailComponent, resolve: { detailRacer: RacerResolver }}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(racerRoutes)],
  exports: [RouterModule],
})
export class RacerRoutingModule { }
