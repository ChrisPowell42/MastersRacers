import { Component, Input } from '@angular/core';
import { RaceEventModel } from '../raceEvent.type';

import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../../Shared/logger.service';

@Component({
  selector: 'race-event-list-item',
  templateUrl: './race-event-list-item.template.html',
  styleUrls: ['./race-event-list-item.style.css']
})
export class RaceEventListItemComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService
  ) { }

  @Input() raceEvent: RaceEventModel;

  onSelectDetails() {

    this.router.navigate(['/raceevents/detail', this.raceEvent.id])
    
  }

  onSelectEdit() {

    //this.logger.log("Edit Event clicked.");
    this.router.navigate(['/raceevents/edit', this.raceEvent.id])

  }

}
