import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SeasonModel } from '../Seasons/season.type';
import { LoggerService } from './logger.service';
import { ErrorService } from './error.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SeasonService {

// "http://mastersracers.azurewebsites.net",
// "http://localhost:17585"

    private seasonsUrl = '/api/seasons';  // URL to web api
    private seasonUrl = '/api/season/';
    private newSeasonUrl = '/api/season/new';

    constructor(private http: Http,
                private logger: LoggerService,
                private errorHandler: ErrorService) { }

    private extractData(res: Response) {

        const body = res.json();

        this.logger.log('Got data, SeasonService');
        this.logger.log(body);

        return body || { };

    }

    getSeasons(): Observable<SeasonModel[]> {

        this.logger.log('Getting Seasons, SeasonService');

        return this.http.get(this.seasonsUrl)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

    getSeason(id: string): Observable<SeasonModel> {

        this.logger.log('Getting single Season, SeasonService');
        this.logger.log(this.seasonUrl + id);

        return this.http.get(this.seasonUrl + id)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

    newSeason(): Observable<SeasonModel> {

        this.logger.log('Adding Season, SeasonService');

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.put(this.newSeasonUrl, null, options)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

}
