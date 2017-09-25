import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../Shared/logger.service';

import { RacerModel } from './racer.type';

@Component({
    templateUrl: './racerList.template.html',
    styleUrls: ['./racerList.style.css'],
    providers: [LoggerService]
})
export class RacerListComponent implements OnInit {

    racers: RacerModel[];
    selectedRacer: RacerModel;
    title = 'Racers';

    constructor(private route: ActivatedRoute,
                private logger: LoggerService) {}

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