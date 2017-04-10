import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LocationModel } from '../Locations/location.type';

import { LocationService } from '../Services/location.service';
import { ErrorService } from '../Shared/error.service';

@Injectable()
export class LocationResolver implements Resolve<LocationModel> {

    constructor (private ls: LocationService,
                 private router: Router,
                 private error: ErrorService) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationModel> {

        const id = route.params['id'];

        return this.ls.getLocation(id).map( loc => {
            if (loc) {
                return loc;
            } else {
                this.error.displayError("Location not found.");
                this.router.navigate(['/location']);
                return null;
            }
        });
    }
}
