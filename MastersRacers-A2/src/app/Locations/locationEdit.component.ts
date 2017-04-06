import { Component, Input } from '@angular/core';
import { LocationModel } from './location.type';

@Component({
    selector: 'location-editor',
    templateUrl: 'locationEdit.template.html'
})
export class LocationEditComponent {
    
    @Input() loc: LocationModel;

}