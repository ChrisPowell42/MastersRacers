import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SeasonModel } from '../Seasons/season.type';

import { SeasonService } from '../Services/season.service';
import { ErrorService } from '../Shared/error.service';
import { LoggerService } from '../Shared/logger.service';

@Injectable()
export class SeasonResolver implements Resolve<SeasonModel> {

    constructor (private ls: SeasonService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SeasonModel> {

        const id = route.params['id'];

        return this.ls.getSeason(id).map( season => {
            if (season) {
                this.logger.log('Season Resolver found season.');
                this.logger.log(season);
                return season;
            } else {
                this.error.displayError('Season not found.');
                this.router.navigate(['/season']);
                return null;
            }
        });
    }
}
