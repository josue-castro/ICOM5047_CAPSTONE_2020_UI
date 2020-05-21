import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';

// Model
import { Cart, CartInfo } from '../models/Cart';

// Mock Data
import { PRODUCTS } from '../mock/mock-data';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartsUrl = 'https://localhost:5001/carts';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.cartsUrl).pipe(
      tap((_) => console.log('fetched carts')),
      catchError(this.handleError<Cart[]>('getCarts', []))
    );
  }

  getCartById(cartId: number): Observable<Cart> {
    const url = `${this.cartsUrl}/${cartId}`;
    return this.http.get<Cart>(url).pipe(
      tap((_) => console.log(`fetched cart w/id=${cartId}`)),
      catchError(this.handleError<Cart>(`getCartById id =${cartId}`))
    );
  }

  getCartContainingProductLotId(lotId: string): Observable<Cart> {
    const url = `${this.cartsUrl}/lotid/${lotId}`;
    return this.http.get<Cart>(url).pipe(
      tap((_) => console.log(`fetched cart containing/lotId=${lotId}`)),
      catchError(
        this.handleError<Cart>(`getCartContainingProductLotId lotId=${lotId}`)
      )
    );
  }

  getCartsContainingProductName(productName: string): Observable<Cart[]> {
    const url = `${this.cartsUrl}/productname/${productName}`;
    return this.http.get<Cart[]>(url).pipe(
      tap((_) =>
        console.log(`fetched cart containing/productName=${productName}`)
      ),
      catchError(
        this.handleError<Cart[]>(
          `getCartsContainingProductName productName=${productName}`
        )
      )
    );
  }

  /** POST: add a new cart to the server */
  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.cartsUrl, cart, this.httpOptions).pipe(
      tap((newCart: Cart) =>
        console.log(`added product w/ id=${newCart.cartId}`)
      ),
      catchError(this.handleError<Cart>('addTodo'))
    );
  }

  /** DELETE: delete the cart from the server */
  deleteCart(cart: Cart | number): Observable<Cart> {
    const id = typeof cart === 'number' ? cart : cart.cartId;
    const url = `${this.cartsUrl}/${id}`;

    return this.http.delete<Cart>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Cart>('deleteHero'))
    );
  }

  /** PUT: update the cart on the server */
  updateCart(cart: Cart): Observable<any> {
    return this.http.put(this.cartsUrl, cart, this.httpOptions).pipe(
      tap((_) => console.log(`updated hero id=${cart.cartId}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // getCartsWithExpiredProducts(): Observable<Cart> {
  //   return this.http.get<Cart>(this.cartsUrl).pipe(
  //     filter()
  //   )
  // }

  searchCarts(term: string, searchBy: string): Observable<Cart | Cart[]> {
    if (!term) {
      return this.getCarts();
    } else {
      switch (searchBy) {
        case 'cartId':
          return this.getCartById(parseInt(term));
        case 'lotId':
          return this.getCartContainingProductLotId(term);

        case 'productName':
          return this.getCartsContainingProductName(term);
      }
    }
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
