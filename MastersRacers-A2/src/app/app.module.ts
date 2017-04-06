import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule} from './Routing/app-routing.module';
import { LocationModule } from './Locations/location.module';
import { SeasonModule } from './Seasons/season.module';

import { SeasonService } from './Services/season.service';
import { LocationService } from './Services/location.service';
import { LoggerService } from './Services/logger.service';
import { ErrorService } from './Services/error.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    LocationModule,
    SeasonModule,
    AppRoutingModule
  ],
  providers: [SeasonService,
              LocationService,
              LoggerService,
              ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
