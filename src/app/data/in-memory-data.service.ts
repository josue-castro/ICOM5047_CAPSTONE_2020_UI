import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CARTS, PRODUCTS } from './mock/mock-data';

// Models
import { Cart } from './models/Cart';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // const carts = CARTS;
    // const products = PRODUCTS;
    // return { carts, products };
    return {};
  }
  // genId<T extends Cart | Product>(myTable: T[]): number {
  //   return myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 11;
  // }
}
