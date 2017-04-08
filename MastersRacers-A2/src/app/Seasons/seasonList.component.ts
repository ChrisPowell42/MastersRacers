import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogService } from '../Services/dialog.service';
import { SeasonService } from '../Services/season.service';
import { LoggerService } from '../Services/logger.service';

import { SeasonModel } from './season.type';

@Component({
    selector: 'season-list',
    templateUrl: './seasonList.template.html',
    providers: [SeasonService, LoggerService, DialogService]
})
export class SeasonListComponent implements OnInit {

    seasons: SeasonModel[];
    selectedSeason: SeasonModel;
    title = 'Seasons';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dialog: DialogService,
                private seasonServe: SeasonService,
                private logger: LoggerService) {}

    getSeasons(): void {

        this.logger.log('Getting Seasons, Component');
        this.seasonServe.getSeasons().subscribe(fetchedSeasons => this.seasons = fetchedSeasons);
        this.logger.log('After Getting Seasons, Component');

    }

    onAddSeason() {

        this.dialog.confirmDialog('Add new Season?')
                   .subscribe(result => {if (result) {this.addNewSeason(); }});

    }

    private postCreateSeason(newSeason: SeasonModel) {

        this.logger.log(newSeason);
        this.getSeasons();

    }

    private addNewSeason(): void {

        this.logger.log('Adding Season, Component');
        this.seasonServe.newSeason().subscribe(addedSeason => this.postCreateSeason(addedSeason));
        this.logger.log('After Season, Component');

    }

    ngOnInit(): void {
        this.getSeasons();
    }

}
