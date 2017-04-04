import { Component, Input } from '@angular/core';
import { Season } from './season';

@Component({
    selector: 'season-list-item',
    templateUrl: './seasonListItem.template.html'
})
export class SeasonListItemComponent {

    @Input() season: Season;

}
