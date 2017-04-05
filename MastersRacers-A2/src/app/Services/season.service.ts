import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Season } from '../Seasons/season';
import { LoggerService } from './logger.service';
import { ErrorService } from './error.service';

@Injectable()
export class SeasonService {

// "http://mastersracers.azurewebsites.net",
// "http://localhost:17585"

    private seasonsUrl = '/api/seasons';  // URL to web api
    private newSeasonUrl = '/api/season/new';

    constructor(private http: Http,
                private logger: LoggerService,
                private errorHandler: ErrorService) { }

    private extractData(res: Response) {

        let body = res.json();

        this.logger.log('Got data, SeasonService');
        this.logger.log(body);

        return body || { };

    }

    getSeasons(): Observable<Season[]> {

        this.logger.log('Getting Seasons, SeasonService');

        return this.http.get(this.seasonsUrl)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

    newSeason(): Observable<Season> {

        this.logger.log('Adding Season, SeasonService');

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.newSeasonUrl, null, options)
                        .map(resp => this.extractData(resp))
                        .catch(error => this.errorHandler.handleError(error));

    }

//     handleError(error: Response | any) {

//         // In a real world app, you might use a remote logging infrastructure
//         let errMsg: string;
//         if (error instanceof Response) {
//             const body = error.json() || '';
//             const err = body.error || JSON.stringify(body);
//             errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//         } else {
//             errMsg = error.message ? error.message : error.toString();
//         }

//         this.errorHandler.handleError(errMsg);

//         return Observable.throw(errMsg);
//   }

}
