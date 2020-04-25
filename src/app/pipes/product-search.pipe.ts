import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'productPipe',
})
export class ProductSearchPipe implements PipeTransform {
  transform(products: Product[], key: string, term: string): Product[] {
    if (!products) return [];
    if (!term) return products;
    return products.filter((product) =>
      product[key].toLowerCase().startsWith(term.toLowerCase())
    );
  }
}
