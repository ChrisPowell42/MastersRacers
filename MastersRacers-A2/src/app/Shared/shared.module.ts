import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './myHighlight.directive';

import { LoggerService } from './logger.service';
import { ErrorService } from './error.service';
import { DialogService } from './dialog.service';

import { ConfirmDialogComponent } from './DialogComponents/confirmDialog.component';

@NgModule({
    imports: [CommonModule],
    exports: [HighlightDirective, CommonModule],
    declarations: [HighlightDirective,
                   ConfirmDialogComponent ],
    providers: [LoggerService,
                ErrorService,
                DialogService],
    entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule { }
