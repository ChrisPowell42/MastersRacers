import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RacerModel } from '../Racers/racer.type';

import { RacerService } from '../Services/racer.service';
import { ErrorService } from '../Shared/error.service';
import { LoggerService } from '../Shared/logger.service';

@Injectable()
export class RacerListResolver implements Resolve<RacerModel[]> {

    constructor (private rs: RacerService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RacerModel[]> {

        return this.rs.getRacers().map( racers => {
            if (racers) {
                this.logger.log('RacerListResolver found racers.');
                this.logger.log(racers);
                return racers;
            } else {
                this.error.displayError('Racers not found.');
                this.router.navigate(['/racers']);
                return null;
            }
        });

    }    

}