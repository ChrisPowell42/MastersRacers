import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RaceEventModel } from '../raceEvent.type';
import { LoggerService } from '../../Shared/logger.service';

@Component({
  templateUrl: './race-event-detail.template.html',
  styleUrls: ['./race-event-detail.style.css']
})
export class RaceEventDetailComponent implements OnInit {

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private logger: LoggerService ){}

    detailRaceEvent: RaceEventModel;

    ngOnInit() {
        this.route.data.subscribe((data: { detailRaceEvent: RaceEventModel }) => {
            this.detailRaceEvent = data.detailRaceEvent;
        });
    }

}
