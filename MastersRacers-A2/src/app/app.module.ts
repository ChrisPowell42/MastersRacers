import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule} from './Routing/app-routing.module';

import { SeasonService } from './Services/season.service';
import { LoggerService } from './Services/logger.service';

import { AppComponent } from './app.component';
import { SeasonListComponent } from './Seasons/seasonList.component';
import { SeasonListItemComponent } from './Seasons/seasonListItem.component';
import { DashboardComponent } from './Dashboard/dashboard.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    SeasonListComponent,
    SeasonListItemComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [SeasonService,
              LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
