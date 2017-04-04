import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../Services/season.service';
import { LoggerService } from '../Services/logger.service';

import { Season } from './season';

@Component({
    selector: 'season-list',
    templateUrl: './seasonList.template.html',
    providers: [SeasonService, LoggerService]
})
export class SeasonListComponent implements OnInit {

    seasons: Season[] = [];
    selectedSeason: Season;
    title = 'Seasons';

    constructor(private seasonServe: SeasonService,
                private logger: LoggerService
               ) {}

    getSeasons(): void {

        this.seasonServe.getSeasons().then(fetchedSeasons => this.seasons = fetchedSeasons);

    }

    addNewSeason(): void {

        var newSeason: Season;

        this.seasonServe.newSeason().then(addedSeason => newSeason = addedSeason);

        this.logger.log(newSeason);

        this.seasons.push(newSeason);

    }

    ngOnInit(): void {
        this.getSeasons();
    }

}
