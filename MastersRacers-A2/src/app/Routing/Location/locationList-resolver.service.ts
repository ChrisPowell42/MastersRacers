import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LocationModel } from '../../Locations/location.type';

import { LocationService } from '../../Services/location.service';
import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class LocationListResolver implements Resolve<LocationModel[]> {

    constructor (private ls: LocationService,
                 private error: ErrorService,
                 private logger: LoggerService,
                 private router: Router) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationModel[]> {

        return this.ls.getLocations().map( locations => {
            if (locations) {
                this.logger.log('LocationListResolver found locations.');
                this.logger.log(locations);
                return locations;
            } else {
                this.error.displayError('Locations not found.');
                this.router.navigate(['/locations']);
                return null;
            }
        });

    }    

}