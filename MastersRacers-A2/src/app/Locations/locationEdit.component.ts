import { Component, OnInit } from '@angular/core';
import { LocationModel } from './location.type';
import { ActivatedRoute, Router } from '@angular/router';

import { LocationService } from '../Services/location.service';
import { LoggerService } from '../Shared/logger.service';
import { MdInputModule } from '@angular/material';

@Component({
    selector: 'location-editor',
    templateUrl: 'locationEdit.template.html',
    styleUrls: ['./locationEdit.style.css']
})
export class LocationEditComponent {

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private lService: LocationService,
                 private logger: LoggerService ){}

    detailLocation: LocationModel;

    ngOnInit() {
        this.route.data.subscribe((data: { detailLocation: LocationModel }) => {
            this.detailLocation = Object.assign(new LocationModel(), data.detailLocation);
        });
    }

    onSave() {

        this.logger.log("Edit Location Save clicked.");

        this.lService.saveLocation(this.detailLocation).subscribe(
            returnLocation => { if (returnLocation != null) {
                this.logger.log(returnLocation);
                this.postSave();
            }; }
        );

    }

    private postSave() {

        let url = `/locations/detail/${this.detailLocation.id}`;

        // Need to figure this out to reload the locationList.
        // It would be nice to do this without the window reload.
        this.router.navigate([url])
                   .then(result => window.location.reload());

    }

}
