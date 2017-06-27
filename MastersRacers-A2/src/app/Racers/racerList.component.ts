import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { RacerService } from '../Services/racer.service';
import { LoggerService } from '../Shared/logger.service';

import { RacerModel } from './racer.type';

@Component({
    templateUrl: './racerList.template.html',
    styleUrls: ['./racerList.style.css'],
    providers: [RacerService, LoggerService]
})
export class RacerListComponent implements OnInit {

    racers: RacerModel[];
    selectedRacer: RacerModel;
    title = 'Racers';

    constructor(private route: ActivatedRoute,
                private racerServe: RacerService,
                private logger: LoggerService) {}

    getRacers() {

        this.logger.log('Getting Racers, Component');
        this.racerServe.getRacers().subscribe(fetchedRacers => this.racers = fetchedRacers);
        this.logger.log('After Getting Racers, Component');

    }

    onDetail(selectRacer: RacerModel) {

        this.selectedRacer = selectRacer;

    }

    addNewRacer() {

        this.logger.log("New racer clicked");

    }

   ngOnInit(): void {

        this.route.data.subscribe((data: { racerList: RacerModel[] }) => {
            this.racers = data.racerList;
        });

    }
}