import { Component, Input } from '@angular/core';
import { LocationModel } from './location.type';

@Component({
    selector: 'location-detail-name',
    templateUrl: 'locationDetail.template.html'
})

export class LocationDetailComponent {

    @Input() loc: LocationModel;

}
