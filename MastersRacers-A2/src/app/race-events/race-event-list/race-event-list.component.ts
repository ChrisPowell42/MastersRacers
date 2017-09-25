import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { RaceEventModel } from '../raceEvent.type';
import { SeasonModel } from '../../Seasons/season.type';

import { LoggerService } from '../../Shared/logger.service';

@Component({
  templateUrl: './race-event-list.template.html',
  styleUrls: ['./race-event-list.style.css']
})
export class RaceEventListComponent implements OnInit {

  raceEvents: RaceEventModel[];
  selectedEvent: RaceEventModel;
  activeSeason: SeasonModel;
  title = 'Race Events';

    constructor(private route: ActivatedRoute,
                private logger: LoggerService) {}


  addNewEvent() {

    this.logger.log("New Event clicked");

  }

  ngOnInit(): void {

    this.route.data.subscribe((data: { raceEventList: RaceEventModel[], activeSeason: SeasonModel }) => {
      this.raceEvents = data.raceEventList;
      this.activeSeason = data.activeSeason;
    });

  }

}
