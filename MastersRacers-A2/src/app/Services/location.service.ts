import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LoggerService } from './logger.service';
import { ErrorService } from './error.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService{

    private locationsUrl: String = '/api/locations';

    constructor(private http: Http,
                private logger: LoggerService,
                private errorHandler: ErrorService) { }

    private extractData(res: Response) {

        let body = res.json();

        this.logger.log('Got data, SeasonService');
        this.logger.log(body);

        return body || { };

    }

}