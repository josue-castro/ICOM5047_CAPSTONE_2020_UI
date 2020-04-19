import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Model
import { Cart, CartInfo } from '../models/Cart';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartsUrl = 'api/carts';

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.cartsUrl).pipe(
      tap((_) => console.log('fetched carts')),
      catchError(this.handleError<Cart[]>('getCarts', []))
    );
  }

  getCartById(id: number): Observable<Cart> {
    const url = `${this.cartsUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      tap((_) => console.log(`fetched cart w/id=${id}`)),
      catchError(this.handleError<Cart>(`getCartById id =${id}`))
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
