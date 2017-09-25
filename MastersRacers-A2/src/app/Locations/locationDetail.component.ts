import { Component, OnInit } from '@angular/core';
import { LocationModel } from './location.type';
import { ActivatedRoute, Router } from '@angular/router';

import { LoggerService } from '../Shared/logger.service';

@Component({
    templateUrl: 'locationDetail.template.html',
    styles: ['.location-detail { margin: 10px; }']
})

export class LocationDetailComponent {

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private logger: LoggerService ){}

    detailLocation: LocationModel;

    ngOnInit() {
        this.route.data.subscribe((data: { detailLocation: LocationModel }) => {
            this.detailLocation = data.detailLocation;
        });
    }


}
