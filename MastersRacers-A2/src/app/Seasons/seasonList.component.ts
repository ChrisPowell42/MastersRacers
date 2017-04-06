import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../Services/season.service';
import { LoggerService } from '../Services/logger.service';

import { SeasonModel } from './season.type';

@Component({
    selector: 'season-list',
    templateUrl: './seasonList.template.html',
    providers: [SeasonService, LoggerService]
})
export class SeasonListComponent implements OnInit {

    seasons: SeasonModel[];
    selectedSeason: SeasonModel;
    title = 'Seasons';

    constructor(private seasonServe: SeasonService,
                private logger: LoggerService) {}

    getSeasons(): void {

        this.logger.log('Getting Seasons, Component');
        this.seasonServe.getSeasons().subscribe(fetchedSeasons => this.seasons = fetchedSeasons);
        this.logger.log('After Getting Seasons, Component');

    }

    addNewSeason(): void {

        this.logger.log('Adding Season, Component');
        this.seasonServe.newSeason().subscribe(addedSeason => this.seasons.push(addedSeason));
        this.logger.log('After Season, Component');

    }

    ngOnInit(): void {
        this.getSeasons();
    }

}
