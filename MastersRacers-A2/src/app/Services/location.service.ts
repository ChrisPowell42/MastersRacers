import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LocationModel } from '../Locations/location.type';
import { LoggerService } from '../Shared/logger.service';
import { ErrorService } from '../Shared/error.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

    private locationsUrl = '/api/locations';
    private locationUrl = '/api/locations/';

    constructor(private http: Http,
                private logger: LoggerService,
                private errorHandler: ErrorService) { }

    private extractData(res: Response) {

        const body = res.json();

        this.logger.log('Got data, LocationService');
        this.logger.log(body);

        return body || { };

    }

    getLocations() {

        this.logger.log('Getting Locations, LocationService');

        return this.http.get(this.locationsUrl)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));


    }

    getLocation(id: string) {

        this.logger.log('Getting Location, LocationService');
        this.logger.log(id);
        
        return this.http.get(this.locationUrl + id)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

}
