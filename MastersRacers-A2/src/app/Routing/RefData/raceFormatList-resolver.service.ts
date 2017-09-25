import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RaceFormatModel } from '../../RefData/raceFormat.type';

import { RefDataService } from '../../Services/refdata.service';
import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class RaceFormatListResolver implements Resolve<RaceFormatModel[]> {

    constructor (private rs: RefDataService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( rout: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceFormatModel[]> {

        return this.rs.getRaceFormats().map( raceFormats => {
            if (raceFormats) {
                return raceFormats;
            } else {
                return null;
            }
        });

    }

}