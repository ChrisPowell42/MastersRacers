import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RaceEventModel } from '../race-events/raceEvent.type';
import { LoggerService } from '../Shared/logger.service';
import { ErrorService } from '../Shared/error.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RaceEventService {

    private raceEventsUrl = '/api/raceevents';
    private activeRaceEventsUrl = '/api/raceevents/active';
    private raceEventUrl = '/api/raceevent/';

    constructor(private http: Http,
                private logger: LoggerService,
                private errorHandler: ErrorService) { }

    private extractData(res: Response) {

        const body = res.json();

        this.logger.log('Got data, LocationService');
        this.logger.log(body);

        return body || { };

    }

    getRaceEvents() {

        this.logger.log('Getting RaceEvents, RaceEventService');

        return this.http.get(this.raceEventsUrl)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

    getActiveSeasonRaceEvents() {

        this.logger.log('Getting Active Season RaceEvents, RaceEventService');

        return this.http.get(this.activeRaceEventsUrl)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));


    }

    saveRaceEvent(modifiedEvent: RaceEventModel) {

        this.logger.log('Saving RaceEvent');
        this.logger.log(modifiedEvent);

        let url = `/api/raceevent/${modifiedEvent.id}`;

        return this.http.put(url, modifiedEvent)
                        .map(resp=> this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }


}