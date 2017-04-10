import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SeasonModel } from '../Seasons/season.type';

import { SeasonService } from '../Services/season.service';
import { ErrorService } from '../Shared/error.service';
import { LoggerService } from '../Shared/logger.service';

@Injectable()
export class SeasonListResolver implements Resolve<SeasonModel[]> {

    constructor (private ls: SeasonService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SeasonModel[]> {

        return this.ls.getSeasons().map( seasons => {
            if (seasons) {
                this.logger.log('SeasonsListResolver found seasons.');
                this.logger.log(seasons);
                return seasons;
            } else {
                this.error.displayError('Seasons not found.');
                this.router.navigate(['season']);
                return null;
            }
        });

    }    

}