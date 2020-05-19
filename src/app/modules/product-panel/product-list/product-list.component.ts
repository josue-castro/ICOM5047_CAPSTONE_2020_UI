import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

// Models
import { Product } from 'src/app/data/models/Product';
import { Cart } from 'src/app/data/models/Cart';
// Services
import { ProductService } from '../../../data/services/product.service';
import * as dateManager from 'src/app/helpers/expiration';

@Component({
  selector: 'product-list[cart]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: Cart;

  isLoading: boolean;
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product;
  showDetails: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      let change = changes['cart'];
      if (!change.firstChange && change.currentValue) {
        this.isLoading = true;
        this.productService
          .getProductsByCartId(change.currentValue.id)
          .subscribe((products) => {
            this.isLoading = false;
            this.products = products;
            this.filteredProducts = this.products;
          });
      }
    }
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.showDetails = true;
  }

  // This search executes in the internal array this.products
  // All searchable parameters are contained within product objects
  searchProduct(searchForm) {
    // searchForm is the event emitted by the (search) event in the product-search component
    const { term, searchBy, filterBy } = searchForm;
    let result: Product[];

    // If no term was specified set result to all products
    if (!term) {
      result = this.products;
    } else {
      // Search for term in searchBy category
      result = this.products.filter((product) =>
        product[searchBy].toLowerCase().startsWith(term.toLowerCase())
      );
    }

    // if Filter was specified filter the result array
    switch (filterBy) {
      case 'expired':
        result = result.filter((product) =>
          dateManager.isExpired(product.expDate)
        );
        break;
      case 'nearExp':
        result = result.filter((product) =>
          dateManager.isNearExpiration(product.expDate, 7)
        );
        break;
    }
    this.filteredProducts = result;
  }
}
