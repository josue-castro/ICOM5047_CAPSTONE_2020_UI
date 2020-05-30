import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';

// Model
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartsUrl = 'https://localhost:5001/carts';

  // This subject is to establish communication between components that handle carts and update the UI
  // Components: cart-list, cart-register, delete-cart, cart-update
  // This components are spread appart an cant communicate directly, therefore the subject.
  // The subject posts an object {cart: Cart, action: string}
  // send the cart object and the action (register, update, delete)
  private cartAction = new Subject<{ cart: Cart; action: string }>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Subject Methods

  // When a new cart is registered send to new cart through the subject
  /**
   * Send Carts and Actions to update the UI. Actions are register, delete, update
   * @param cart Cart object
   * @param action Action to update UI
   */
  sendCartAction(cart: Cart, action: string) {
    this.cartAction.next({ cart: cart, action: action });
  }

  // Subscribe to see if a new cart has been added
  getCartAction(): Observable<{ cart: Cart; action: String }> {
    return this.cartAction.asObservable();
  }

  // HTTP Methods
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

  getCartsByProductExpirationDate(expirationDate: string): Observable<Cart[]> {
    const url = `${this.cartsUrl}/expirationdate/${expirationDate}`;
    return this.http.get<Cart[]>(url).pipe(
      tap((_) =>
        console.log(`fetched cart containing/expirationdate=${expirationDate}`)
      ),
      catchError(
        this.handleError<Cart[]>(
          `getCartsContainingProductName expirationdate=${expirationDate}`
        )
      )
    );
  }

  /** POST: add a new cart to the server */
  addCart(cart: Cart): Observable<Cart> {
    return this.http
      .post<Cart>(this.cartsUrl, cart, this.httpOptions)
      .pipe(
        tap((newCart: Cart) =>
          console.log(`added product w/ id=${newCart.cartId}`)
        )
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

  searchCarts(term: string, searchBy: string): Observable<Cart | Cart[]> {
    // If no term is specified get a list of all carts
    if (!term) {
      return this.getCarts();
    } else {
      // If term was specified search according to the searchBy value
      switch (searchBy) {
        case 'cartName':
          return this.getCarts().pipe(
            map((results) =>
              results.filter((cart) =>
                cart.cartName.toLowerCase().startsWith(term.toLowerCase())
              )
            )
          );
        case 'lotId':
          return this.getCartContainingProductLotId(term);
        case 'productName':
          return this.getCartsContainingProductName(term);
        case 'expDate':
          return this.getCartsByProductExpirationDate(term);
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
