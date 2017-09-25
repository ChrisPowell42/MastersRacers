import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RaceEventModel } from '../../race-events/raceEvent.type';

import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class RaceEventResolver implements Resolve<RaceEventModel> {

    constructor (private router: Router,
                 private logger: LoggerService,
                 private error: ErrorService) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceEventModel> {
       
        const id: string = route.params['id'];
        const eventList = route.parent.data.raceEventList;

        let returnEvent: RaceEventModel = eventList.find( x => x.id === id);

        return Observable.of(returnEvent);
    }
}

