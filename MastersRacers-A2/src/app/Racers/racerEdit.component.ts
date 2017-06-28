import { Component, OnInit } from '@angular/core';
import { RacerModel } from './racer.type';
import { RaceSeriesModel } from '../RefData/raceSeries.type';
import { ActivatedRoute, Router } from '@angular/router';

import { RacerService } from '../Services/racer.service';
import { LoggerService } from '../Shared/logger.service';
import { MdInputModule } from '@angular/material';

@Component({
    selector: 'racer-editor',
    templateUrl: './racerEdit.template.html',
    styleUrls: ['./racerEdit.style.css']
})
export class RacerEditComponent {

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private rService: RacerService,
                 private logger: LoggerService ){}

    detailRacer: RacerModel;
    raceSeries: RaceSeriesModel[];

    ngOnInit() {
        this.logger.log("Initializing Racer Editor.");
        this.route.data.subscribe((data: { detailRacer: RacerModel, raceSeries: RaceSeriesModel[] }) => {
            this.detailRacer = Object.assign(new RacerModel(), data.detailRacer);
            this.raceSeries = data.raceSeries;
        });
    }

    onCancel() {
        this.logger.log("Cancel Clicked");
        this.router.navigate(['/racers']);
    }

    onSave() {

        this.logger.log("Edit Racer Save clicked.");

        this.rService.saveRacer(this.detailRacer).subscribe(
            returnRacer => { if (returnRacer != null) {
                this.logger.log(returnRacer);
                this.postSave();
            }; }
        );

    }

    private postSave() {

        let url = `/racers/detail/${this.detailRacer.id}`;

        // Need to figure this out to reload the locationList.
        // It would be nice to do this without the window reload.
        this.router.navigate([url])
                   .then(result => window.location.reload());

    }

}
