import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';

// Model
import { Cart, CartInfo } from '../models/Cart';

// Mock Data
import { PRODUCTS } from '../mock/mock-data';

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

  getCartContainingProductLotId(lotId: string): Observable<Cart[]> {
    const cartIds = PRODUCTS.filter((product) => product.lotId === lotId).map(
      (product) => product.cartId
    );

    return this.http
      .get<Cart[]>(this.cartsUrl)
      .pipe(map((carts) => carts.filter((cart) => cartIds.includes(cart.id))));
  }

  getCartsContainingProductName(productName: string): Observable<Cart[]> {
    const cartIds = PRODUCTS.filter(
      (product) => product.productName === productName
    ).map((product) => product.cartId);

    return this.http
      .get<Cart[]>(this.cartsUrl)
      .pipe(map((carts) => carts.filter((cart) => cartIds.includes(cart.id))));
  }

  // getCartsWithExpiredProducts(): Observable<Cart> {
  //   return this.http.get<Cart>(this.cartsUrl).pipe(
  //     filter()
  //   )
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
