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
  private productsUrl = 'https://localhost:5001/products';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getProductsByCartId(cartId: number): Observable<Product[]> {
    const url = `${this.productsUrl}/cartid/${cartId}`;
    return this.http.get<Product[]>(url).pipe(
      tap((_) => console.log(`fetched products w/cartId=${cartId}`)),
      catchError(
        this.handleError<Product[]>(`getProductsByCartId cartId=${cartId}`)
      )
    );
  }

  getProductById(productId: number): Observable<Product[]> {
    const url = `${this.productsUrl}/${productId}`;
    return this.http.get<Product[]>(url).pipe(
      tap((_) => console.log(`fetched product w/productId=${productId}`)),
      catchError(
        this.handleError<Product[]>(`getProductsByLotId productId=${productId}`)
      )
    );
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.productsUrl, product, this.httpOptions)
      .pipe(
        tap((newProduct: Product) =>
          console.log(`added product w/ id=${newProduct.productId}`)
        )
      );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.productId;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('delete product'))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      tap((_) => console.log(`updated hero id=${product.productId}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  searchProduct(
    cartId: number,
    term: string,
    searchBy: string,
    filterBy: string
  ): Observable<Product[]> {
    let result: Observable<Product[]>;

    // If no search term was specified get all products in cart with id=cartId
    if (!term) {
      result = this.getProductsByCartId(cartId);
    } else {
      /* If a term was specified search for the term giving matching the searchBy 
       paramater. searchBy is a key in the products object and both values are string 
       searchBy is either (lotId) or (productName)
      */
      result = this.getProductsByCartId(cartId).pipe(
        map((results) =>
          results.filter(
            (products) => products[searchBy].toLowerCase() == term.toLowerCase()
          )
        )
      );
    }

    /* At this point (result) already has a value
    Filter the product's observable if filteBy was specified 
    based on products' expiration date 
    */
    switch (filterBy) {
      case 'expired':
        result = result.pipe(
          map((products) =>
            products.filter((product) =>
              dateManager.isExpired(product.expirationDate)
            )
          )
        );
        break;

      case 'nearExp':
        result = result.pipe(
          map((products) =>
            products.filter((product) =>
              dateManager.isNearExpiration(product.expirationDate, 7)
            )
          )
        );
        break;
    }

    return result;
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
