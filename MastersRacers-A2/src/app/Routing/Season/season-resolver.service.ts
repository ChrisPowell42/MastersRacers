import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SeasonModel } from '../../Seasons/season.type';

import { SeasonService } from '../../Services/season.service';
import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class SeasonResolver implements Resolve<SeasonModel> {

    constructor (private ls: SeasonService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SeasonModel> {

        const id: string = route.params['id'];
        const seasonList = route.parent.data.seasonList;

        let returnSeason: SeasonModel = seasonList.find( x => x.id === id);

        return Observable.of(returnSeason);

    }
}
