import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RaceFormatModel } from '../RefData/raceFormat.type';
import { RaceSeriesModel } from '../RefData/raceSeries.type';

import { LoggerService } from '../Shared/logger.service';
import { ErrorService } from '../Shared/error.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RefDataService {

    constructor(private http: Http,
                private logger: LoggerService,
                private errorHandler: ErrorService) { }

    private raceFormatUrl = '/api/refdata/raceformats';
    private raceSeriesUrl = '/api/refdata/raceseries';

    private extractData(res: Response) {

        const body = res.json();

        this.logger.log('Got data, SeasonService');
        this.logger.log(body);

        return body || { };

    }

    getRaceFormats(): Observable<RaceFormatModel> {

      this.logger.log('Getting RaceFormats, RefDataService');

      return this.http.get(this.raceFormatUrl)
                      .map(resp => this.extractData(resp))
                      .catch(error => this.errorHandler.handleError(error));
    }

    getRaceSeries(): Observable<RaceSeriesModel> {

      this.logger.log('Getting RaceSeries, RefDataService');

      return this.http.get(this.raceSeriesUrl)
                      .map(resp => this.extractData(resp))
                      .catch(error => this.errorHandler.handleError(error));

    }

}
