import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../Shared/shared.module';
import { RacerService } from '../Services/racer.service';

import { RacerListResolver } from '../Routing/racerList-resolver.service';
import { RacerResolver } from '../Routing/racer-resolver.service';
import { RacerRoutingModule } from '../Routing/racer-routing.module';
import { RacerListComponent } from './racerList.component';
import { RacerDefaultComponent } from './racerDefault.component';
import { RacerListItemComponent } from './racerListItem.component';
import { RacerDetailComponent } from './racerDetail.component';


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
    RacerDetailComponent
  ],
  providers: [
    RacerService,
    RacerListResolver,
    RacerResolver,
    RacerRoutingModule
  ]
})
export class RacerModule {}
