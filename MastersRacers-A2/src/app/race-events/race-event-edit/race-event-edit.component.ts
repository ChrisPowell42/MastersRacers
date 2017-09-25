import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RaceEventModel } from '../raceEvent.type';
import { RaceFormatModel } from '../../RefData/raceFormat.type';
import { LocationModel } from '../../Locations/location.type';
import { SeasonModel } from '../../Seasons/season.type';

import { RaceEventService } from '../../Services/raceEvent.service';
import { LoggerService } from '../../Shared/logger.service';
import { MdInputModule, MdDatepickerModule } from '@angular/material';

@Component({
  selector: 'app-race-event-edit',
  templateUrl: './race-event-edit.template.html',
  styleUrls: ['./race-event-edit.style.css']
})
export class RaceEventEditComponent implements OnInit {

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private rService: RaceEventService,
                 private logger: LoggerService ){}

  detailEvent: RaceEventModel;
  raceFormats: RaceFormatModel[];
  locations: LocationModel[];
  season: SeasonModel;

  ngOnInit() {

    this.logger.log("Initializing Race Event Editor");
    this.route.data.subscribe((data: {detailEvent: RaceEventModel, 
                                      raceFormats: RaceFormatModel[],
                                      locations: LocationModel[],
                                      season: SeasonModel}) => {
      this.detailEvent = Object.assign(new RaceEventModel(), data.detailEvent);
      this.raceFormats = data.raceFormats;
      this.locations = data.locations;
      this.season = data.season;
    });

  }

  onCancel() {
    this.logger.log("Cancel Clicked");
    this.router.navigate(['/raceevents']);
  }

  onSave() {

    this.logger.log("Edit Location Save clicked.");

    this.rService.saveRaceEvent(this.detailEvent).subscribe(
      returnEvent => { if (returnEvent != null) {
                this.logger.log(returnEvent);
                this.postSave();
      }; });

  }

  private postSave() {

        let url = `/raceevents/detail/${this.detailEvent.id}`;

        // Need to figure this out to reload the locationList.
        // It would be nice to do this without the window reload.
        this.router.navigate([url])
                   .then(result => window.location.reload());

  }


}
