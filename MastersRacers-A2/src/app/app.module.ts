import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule} from './Routing/app-routing.module';
import { SharedModule } from './Shared/shared.module';

import { SeasonService } from './Services/season.service';
import { LocationService } from './Services/location.service';
import { RacerService } from './Services/racer.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { PageNotFoundComponent } from './Dashboard/not-found.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [SeasonService,
              LocationService,
              RacerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
