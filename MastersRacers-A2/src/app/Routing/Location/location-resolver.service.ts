import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LocationModel } from '../../Locations/location.type';

import { ErrorService } from '../../Shared/error.service';
import { LoggerService } from '../../Shared/logger.service';

@Injectable()
export class LocationResolver implements Resolve<LocationModel> {

    constructor (private router: Router,
                 private logger: LoggerService,
                 private error: ErrorService) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationModel> {

        const id: string = route.params['id'];
        const locationList = route.parent.data.locationList;

        let returnLocation: LocationModel = locationList.find( x => x.id === id);

        return Observable.of(returnLocation);
    }
}