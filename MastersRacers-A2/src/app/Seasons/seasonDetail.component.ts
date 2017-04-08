import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SeasonModel } from './season.type';

import { SeasonService } from '../Services/season.service';

@Component({
    selector: 'season-detail',
    templateUrl: './seasonDetail.template.html'
})
export class SeasonDetailComponent implements OnInit {

    detailSeason: SeasonModel;

constructor( private route: ActivatedRoute ){}

    onMakeActive() {

    }

    ngOnInit() {
        this.route.data
        .subscribe((data: { detailSeason: SeasonModel }) => {
            this.detailSeason = data.detailSeason;
        });
    }

}
