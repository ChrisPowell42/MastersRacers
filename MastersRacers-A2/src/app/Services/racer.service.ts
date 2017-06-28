import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RacerModel } from '../Racers/racer.type';
import { LoggerService } from '../Shared/logger.service';
import { ErrorService } from '../Shared/error.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RacerService {

    constructor(private http: Http,
                private logger: LoggerService,
                private errorHandler: ErrorService) { }

    private racerUrl = '/api/racers';

    private extractData(res: Response) {

        const body = res.json();

        this.logger.log('Got data, RacerService');
        this.logger.log(body);

        return body || { };

    }

    getRacers(): Observable<RacerModel[]> {

      this.logger.log('Fetching Racers, RacerService');

      return this.http.get(this.racerUrl)
                      .map(resp => this.extractData(resp))
                      .catch(error => this.errorHandler.handleError(error));

    }

    saveRacer(modifiedRacer: RacerModel) {

        this.logger.log('Saving Racer');
        this.logger.log(modifiedRacer);

        let url = `/api/racer/${modifiedRacer.id}`;

        return this.http.put(url, modifiedRacer)
                        .map(resp=> this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

}
