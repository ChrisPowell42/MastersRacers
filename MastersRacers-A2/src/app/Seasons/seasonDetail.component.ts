import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SeasonModel } from './season.type';

import { SeasonService } from '../Services/season.service';
import { DialogService } from '../Shared/dialog.service';
import { LoggerService } from '../Shared/logger.service';

import { SeasonListComponent } from './seasonList.component';

@Component({
    selector: 'season-detail',
    templateUrl: './seasonDetail.template.html'
})
export class SeasonDetailComponent implements OnInit {

    detailSeason: SeasonModel;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private sServe: SeasonService,
                 private dialog: DialogService,
                 private logger: LoggerService ){}

    onMakeActive() {

        this.dialog.confirmDialog(`Make Season ${this.detailSeason.startYear}-${this.detailSeason.endYear} the active season?`, 
                                  'Confirm Activation')
                   .subscribe(resp => { if (resp) { this.makeActive(); }});

    }

    private makeActive() {

        this.sServe.makeActiveSeason(this.detailSeason).subscribe(
            success => { if (success) {
                this.postMakeActive();
            }; }
        );

    }

    private postMakeActive() {
        // Need to figure this out to reload the seasonList.
        this.router.navigate(['/seasons'])
                   .then(result => window.location.reload());

    }

    ngOnInit() {
        this.route.data.subscribe((data: { detailSeason: SeasonModel }) => {
            this.detailSeason = data.detailSeason;
        });
    }

}
