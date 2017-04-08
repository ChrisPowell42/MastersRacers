import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorService } from './error.service';
import { LoggerService } from './logger.service';

import { ConfirmDialogComponent} from './DialogComponents/confirmDialog.component';

@Injectable()
export class DialogService {

    constructor(public dialog: MdDialog,
                private logger: LoggerService,
                private errors: ErrorService) {}

    confirmDialog(message?: string): Observable<boolean> {

    //     this.logger.log(message);

    //     // This is temporary until I can figure out how to get the Material Dialog working.
    //     return Observable.of(window.confirm(message || 'Is it OK?'));

    // }

        let dialogRef = this.dialog.open(ConfirmDialogComponent);

        return dialogRef.afterClosed()
                        .map(result => result as boolean)
                        .catch(error => this.errors.handleError(error));

    }
}
