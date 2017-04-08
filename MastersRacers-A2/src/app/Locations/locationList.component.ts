import { Component, OnInit } from '@angular/core';
import { LocationService } from '../Services/location.service';
import { LoggerService } from '../Services/logger.service';

import { LocationModel } from './location.type';

@Component({
    templateUrl: './locationList.template.html',
    styles: ['md-sidenav { width: 400px; }'],
    providers: [LocationService, LoggerService]
})
export class LocationListComponent implements OnInit {

    locations: LocationModel[];
    selectedLocation: LocationModel;
    title = 'Locations';

    constructor(private locationServe: LocationService,
                private logger: LoggerService) {}

    getLocations() {

        this.logger.log('Getting Locations, Component');
        this.locationServe.getLocations().subscribe(fetchedLocations => this.locations = fetchedLocations);
        this.logger.log('After Getting Seasons, Component');

    }

    onDetail(selectLoc: LocationModel) {

        this.selectedLocation = selectLoc;

    }

    ngOnInit(): void {

        this.getLocations();
    }

}
