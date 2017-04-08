import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './myHighlight.directive';

@NgModule({
    imports: [CommonModule],
    exports: [HighlightDirective, CommonModule],
    declarations: [HighlightDirective],
    providers: [],
})
export class SharedModule { }
