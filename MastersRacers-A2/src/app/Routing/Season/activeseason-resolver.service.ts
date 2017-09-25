import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SeasonModel } from '../../Seasons/season.type';

import { SeasonService } from '../../Services/season.service';
import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class ActiveSeasonResolver implements Resolve<SeasonModel> {

    constructor (private ls: SeasonService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SeasonModel> {

        return this.ls.getActiveSeason().map( season => {
            if (season) {
                this.logger.log('ActiveSeasonsResolver found active season.');
                this.logger.log(season);
                return season;
            } else {
                this.error.displayError('Active Season not found.');
                this.router.navigate(['/seasons']);
                return null;
            }
        });

    }
}
