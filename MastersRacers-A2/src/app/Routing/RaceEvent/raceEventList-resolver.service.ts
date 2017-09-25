import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RaceEventModel } from '../../race-events/raceEvent.type';

import { RaceEventService } from '../../Services/raceEvent.service';
import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class RaceEventListResolver implements Resolve<RaceEventModel[]> {

    constructor (private rs: RaceEventService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceEventModel[]> {

        return this.rs.getActiveSeasonRaceEvents().map( raceEvents => {
            if (raceEvents) {
                this.logger.log('RaceEventListResolver found raceEvents.');
                this.logger.log(raceEvents);
                return raceEvents;
            } else {
                this.error.displayError('RaceEvents not found.');
                this.router.navigate(['/raceevents']);
                return null;
            }
        });

    }    

}