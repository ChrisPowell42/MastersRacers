import { Component, OnInit } from '@angular/core';
import { LocationModel } from './location.type';
import { ActivatedRoute, Router } from '@angular/router';

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
                 private logger: LoggerService ){}

    detailLocation: LocationModel;

    ngOnInit() {
        this.route.data.subscribe((data: { detailLocation: LocationModel }) => {
            this.detailLocation = data.detailLocation;
        });
    }

    onSave() {

        this.logger.log("Edit Location Save clicked.");

    }

}
