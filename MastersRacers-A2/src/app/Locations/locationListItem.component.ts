import { Component, Input } from '@angular/core';
import { LocationModel } from './location.type';

@Component({
    selector: 'location-list-item',
    templateUrl: './locationListItem.template.html'
})
export class LocationListItemComponent {

    @Input() loc: LocationModel;

}
