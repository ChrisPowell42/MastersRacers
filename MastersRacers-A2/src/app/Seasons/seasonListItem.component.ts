import { Component, Input } from '@angular/core';
import { SeasonModel } from './season.type';

@Component({
    selector: 'season-list-item',
    templateUrl: './seasonListItem.template.html'
})
export class SeasonListItemComponent {

    @Input() season: SeasonModel;

}
