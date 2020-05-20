import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as dateManager from 'src/app/helpers/expiration';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Model
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getProductsByCartId(cartId: number): Observable<Product[]> {
    const url = `${this.productsUrl}/?cartId=${cartId}`;
    return this.http.get<Product[]>(url).pipe(
      tap((_) => console.log(`fetched products w/cartId=${cartId}`)),
      catchError(
        this.handleError<Product[]>(`getProductsByCartId cartId=${cartId}`)
      )
    );
  }

  getProductByLotId(cartId: number, lotId: string): Observable<Product[]> {
    const url = `${this.productsUrl}/?lotId=${lotId}&cartId=${cartId}`;
    return this.http.get<Product[]>(url).pipe(
      tap((_) => console.log(`fetched product w/lotId=${lotId}`)),
      catchError(
        this.handleError<Product[]>(`getProductsByLotId lotId=${lotId}`)
      )
    );
  }

  getProductsByName(cartId: number, name: string): Observable<Product[]> {
    const url = `${this.productsUrl}/?productName=${name}&cartId=${cartId}`;
    return this.http.get<Product[]>(url).pipe(
      tap((_) => console.log(`fetched products w/name=${name}`)),
      catchError(
        this.handleError<Product[]>(`getProductsByName name=${name}`, [])
      )
    );
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.productsUrl, product, this.httpOptions)
      .pipe(
        tap((newProduct: Product) =>
          console.log(`added product w/ id=${newProduct.id}`)
        ),
        catchError(this.handleError<Product>('addTodo'))
      );
  }

  /** DELETE: delete the product from the server */
  deleteCart(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Product>('deleteHero'))
    );
  }

  /** PUT: update the product on the server */
  updateCart(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      tap((_) => console.log(`updated hero id=${product.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  productSearch(
    cartId: number,
    key: string,
    term: string
  ): Observable<Product[]> {
    const url = `${this.productsUrl}/?cartId=${cartId}&${key}=${term}`;
    return this.http.get<Product[]>(url).pipe(
      tap((_) =>
        console.log(`fetched product w/cartId=${cartId} & ${key}=${term}`)
      ),
      catchError(this.handleError<Product[]>(`Product Search`, []))
    );
  }

  searchProduct(
    cartId: number,
    term: string,
    searchBy: string,
    filterBy: string
  ): Observable<Product[]> {
    // Products to return
    let products: Observable<Product[]>;

    // If no term was specified return all products in cart with id=cartId
    if (!term) {
      products = this.getProductsByCartId(cartId);
    } else {
      // If term was specified then we search for it in the searchBy category
      switch (searchBy) {
        case 'lotId':
          products = this.getProductByLotId(cartId, term);
          break;
        case 'productName':
          products = this.getProductsByName(cartId, term);
          break;
      }
    }

    switch (filterBy) {
      case 'expired':
        products.pipe(
          map((results) =>
            results.filter((product) => dateManager.isExpired(product.expDate))
          )
        );
        break;

      case 'nearExp':
        products.pipe(
          map((results) =>
            results.filter((product) =>
              dateManager.isNearExpiration(product.expDate, 7)
            )
          )
        );
        break;
    }

    return products;
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
