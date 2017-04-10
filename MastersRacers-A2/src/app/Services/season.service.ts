import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SeasonModel } from '../Seasons/season.type';
import { LoggerService } from '../Shared/logger.service';
import { ErrorService } from '../Shared/error.service';

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
        let url = `/api/season/${id}`;
        this.logger.log(url);

        return this.http.get(url)
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

    makeActiveSeason(targetSeason: SeasonModel): Observable<boolean> {

        this.logger.log('Making Season active, SeasonService');
        this.logger.log(targetSeason);

        let url = `/api/season/${targetSeason.id}/active`;

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.put(url, null, options)
                        .map(resp => resp.json() as boolean )
                        .catch(error => this.errorHandler.handleError(error));
    }

}
