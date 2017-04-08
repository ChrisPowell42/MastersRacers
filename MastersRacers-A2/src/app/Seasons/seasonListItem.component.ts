import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SeasonModel } from './season.type';
import { LoggerService } from '../Services/logger.service';

@Component({
    selector: 'season-list-item',
    templateUrl: './seasonListItem.template.html'
})
export class SeasonListItemComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private logger: LoggerService
    ) {}

    @Input() season: SeasonModel;

    onSelectDetails() {

        this.router.navigate(['../seasons/detail/' + this.season.id]); // , { relativeTo: this.route });
 
    }

}
