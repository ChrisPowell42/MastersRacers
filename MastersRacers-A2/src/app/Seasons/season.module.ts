import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DialogService } from '../Services/dialog.service';

import { SeasonService } from '../Services/season.service';
import { SeasonRoutingModule } from '../Routing/season-routing.module';
import { SeasonResolver } from '../Routing/season-resolver.service';
import { SharedModule } from '../Shared/shared.module';

import { SeasonListComponent } from './seasonList.component';
import { SeasonListItemComponent } from './seasonListItem.component';
import { SeasonDefaultComponent } from './seasonDefault.component';
import { SeasonDetailComponent } from './seasonDetail.component';

import { ConfirmDialogComponent } from '../Services/DialogComponents/confirmDialog.component';

@NgModule({
    imports: [
        FormsModule,
        MaterialModule,
        SeasonRoutingModule,
        SharedModule
    ],
    declarations: [
        SeasonListComponent,
        SeasonListItemComponent,
        SeasonDefaultComponent,
        SeasonDetailComponent,
        ConfirmDialogComponent
    ],
    entryComponents: [ ConfirmDialogComponent ],
    providers: [ SeasonService, SeasonResolver, DialogService ]
})
export class SeasonModule {}
