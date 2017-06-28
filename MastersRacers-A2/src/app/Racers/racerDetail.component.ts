import { Component, OnInit } from '@angular/core';
import { RacerModel } from './racer.type';
import { ActivatedRoute, Router } from '@angular/router';

import { LoggerService } from '../Shared/logger.service';

@Component({
    selector: 'racer-detail-name',
    templateUrl: 'racerDetail.template.html',
    styles: ['.racer-detail { margin: 10px; }']
})

export class RacerDetailComponent {

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private logger: LoggerService ){}

    detailRacer: RacerModel;

    ngOnInit() {
        this.route.data.subscribe((data: { detailRacer: RacerModel }) => {
            this.detailRacer = data.detailRacer;
        });
    }


}
