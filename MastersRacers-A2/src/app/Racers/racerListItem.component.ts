import { Component, Input } from '@angular/core';
import { RacerModel } from './racer.type';

import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../Shared/logger.service';

@Component({
    selector: 'racer-list-item',
    templateUrl: './racerListItem.template.html'
})
export class RacerListItemComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private logger: LoggerService
    ) {}


    @Input() racer: RacerModel;

    onSelectDetails() {

        this.logger.log("Racer detail selected.");
        this.router.navigate([`../racers/detail/${this.racer.id}`]); // , { relativeTo: this.route });
 
    }


    onSelectEdit() {
        
        this.logger.log("Racer Edit button clicked.");
        // this.router.navigate([`../racers/edit/${this.racer.id}`]);
    }

}
