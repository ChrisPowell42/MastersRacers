import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar} from '@angular/material';

import { LoggerService } from './logger.service';

import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorService {

    constructor(private logger: LoggerService,
                private snackBar: MdSnackBar) { }

    handleError(error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        this.logger.error(errMsg);
        this.snackBar.open(errMsg, 'x');

        return Observable.throw(errMsg);

    }

    displayError(error: string ) {

        this.logger.error(error);
        this.snackBar.open(error, 'x');

    }

}
