import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SeasonService } from '../Services/season.service';

import { SeasonListComponent } from './seasonList.component';
import { SeasonListItemComponent } from './seasonListItem.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        MaterialModule
    ],
    declarations: [
        SeasonListComponent,
        SeasonListItemComponent
    ],
    providers: [ SeasonService ]
})
export class SeasonModule {}
