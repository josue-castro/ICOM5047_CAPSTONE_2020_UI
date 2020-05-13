import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Model
import { Product } from '../models/Product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((_) => console.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap((_) => console.log(`fetched products w/id=${id}`)),
      catchError(this.handleError<Product>(`getProductById id=${id}`))
    );
  }

  getProductsByCartId(cartId: number): Observable<Product[]> {
    const url = `${this.productsUrl}/?cartId=${cartId}`;
    return this.http.get<Product[]>(url).pipe(
      tap((_) => console.log(`fetched products w/cartId=${cartId}`)),
      catchError(
        this.handleError<Product[]>(`getProductsByCartId cartId=${cartId}`)
      )
    );
  }

  getProductByLotId(cartId: number, lotId: string): Observable<Product> {
    const url = `${this.productsUrl}/?lotId=${lotId}&cartId=${cartId}`;
    return this.http.get<Product>(url).pipe(
      tap((_) => console.log(`fetched product w/lotId=${lotId}`)),
      catchError(this.handleError<Product>(`getProductsByLotId lotId=${lotId}`))
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

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    let url = `${this.productsUrl}/?productName=${term}`;
    return this.http
      .get<Product[]>(url)
      .pipe(catchError(this.handleError<Product[]>('searchProducts', [])));
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