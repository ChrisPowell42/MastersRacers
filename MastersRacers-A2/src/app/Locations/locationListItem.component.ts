import { Component, Input } from '@angular/core';
import { LocationModel } from './location.type';

import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../Shared/logger.service';

@Component({
    selector: 'location-list-item',
    templateUrl: './locationListItem.template.html'
})
export class LocationListItemComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private logger: LoggerService
    ) {}


    @Input() loc: LocationModel;

    onSelectDetails() {

        this.router.navigate(['/locations/detail', this.loc.id])

    }


    onSelectEdit() {
        
        this.router.navigate(['/locations/edit', this.loc.id]);

    }

}
