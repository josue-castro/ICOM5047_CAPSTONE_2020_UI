import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Site } from '../models/Site';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  private sitesUrl = 'https://localhost:5001/sites';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.sitesUrl).pipe(
      tap((_) => console.log('fetched sites')),
      catchError(this.handleError<Site[]>('getSites', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
