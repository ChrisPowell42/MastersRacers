import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RaceSeriesModel } from '../RefData/raceSeries.type';

import { RefDataService } from '../Services/refdata.service';
import { ErrorService } from '../Shared/error.service';
import { LoggerService } from '../Shared/logger.service';

@Injectable()
export class RaceSeriesListResolver implements Resolve<RaceSeriesModel[]> {

    constructor (private rs: RefDataService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceSeriesModel[]> {

        return this.rs.getRaceSeries().map( raceSeries => {
            if (raceSeries) {
                this.logger.log('RaceSeriesListResolver found raceSeries.');
                // this.logger.log(raceSeries);
                return raceSeries;
            } else {
                this.error.displayError('RaceSeries not found.');
                this.router.navigate(['/racers']);
                return null;
            }
        });

    }    

}