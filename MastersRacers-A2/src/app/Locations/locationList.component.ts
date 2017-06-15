import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { LocationService } from '../Services/location.service';
import { LoggerService } from '../Shared/logger.service';

import { LocationModel } from './location.type';

@Component({
    templateUrl: './locationList.template.html',
    styleUrls: ['./locationList.style.css'],
    providers: [LocationService, LoggerService]
})
export class LocationListComponent implements OnInit {

    locations: LocationModel[];
    selectedLocation: LocationModel;
    title = 'Locations';

    constructor(private route: ActivatedRoute,
                private locationServe: LocationService,
                private logger: LoggerService) {}

    getLocations() {

        this.logger.log('Getting Locations, Component');
        this.locationServe.getLocations().subscribe(fetchedLocations => this.locations = fetchedLocations);
        this.logger.log('After Getting Seasons, Component');

    }

    onDetail(selectLoc: LocationModel) {

        this.selectedLocation = selectLoc;

    }

    addNewLocation() {

        this.logger.log("New location clicked");

    }

   ngOnInit(): void {

        //this.getSeasons();
        this.route.data.subscribe((data: { locationList: LocationModel[] }) => {
            this.locations = data.locationList;
        });

    }
}
