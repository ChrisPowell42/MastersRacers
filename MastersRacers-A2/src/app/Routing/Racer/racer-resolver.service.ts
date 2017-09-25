import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RacerModel } from '../../Racers/racer.type';

import { RacerService } from '../../Services/racer.service';
import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class RacerResolver implements Resolve<RacerModel> {

    constructor (private rs: RacerService,
                 private router: Router,
                 private logger: LoggerService,
                 private error: ErrorService) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RacerModel> {

        const id: string = route.params['id'];
        const racerList = route.parent.data.racerList;

        let returnRacer: RacerModel = racerList.find( x => x.id === id);

        return Observable.of(returnRacer);
    }
}
