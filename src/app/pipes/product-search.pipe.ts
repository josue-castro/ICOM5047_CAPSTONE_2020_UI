import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'productSearch',
})
export class ProductSearchPipe implements PipeTransform {
  transform(products: Product[], key: string, term: string): Product[] {
    if (!term) return products;
    if (!products) return [];

    return products.filter((product) =>
      product[key].toLowerCase().includes(term.toLowerCase())
    );
  }
}
