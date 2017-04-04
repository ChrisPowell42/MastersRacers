import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Season } from '../Seasons/season';
import { LoggerService } from './logger.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SeasonService {

// "http://mastersracers.azurewebsites.net",
// "http://localhost:17585"

    private headers = new Headers({'Content-Type': 'application/json'});
    private seasonsUrl = '/api/seasons';  // URL to web api
    private newSeasonUrl = '/api/season/00000000-0000-0000-0000-000000000000';

    constructor(private http: Http,
                private logger: LoggerService) { }

    getSeasons(): Promise<Season[]> {

        return this.http.get(this.seasonsUrl)
                        .toPromise()
                        .then(response => response.json() as Season[])
                        .catch(this.handleError);

    }

    newSeason(): Promise<Season> {

        var newSeason: Season;

        this.http.put(this.newSeasonUrl, null)
                 .toPromise()
                 .then(response => newSeason = response.json().data as Season)
                 .catch(this.handleError);

        this.logger.log(newSeason);

        return Promise.resolve(newSeason);

    }

    handleError(error: any): Promise<any> {
        // console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

}
