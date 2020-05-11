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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: Cart;

  products: Product[];
  searchOptions = [
    { value: 'lotId', viewValue: 'Lot ID' },
    { value: 'Product Name', viewValue: 'Product Name' },
  ];
  selectedProduct: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];
      switch (propName) {
        case 'cart': {
          console.log(this.cart);
          if (change.currentValue) {
            console.log(change.currentValue);
            this.productService
              .getProductsByCartId(change.currentValue.id)
              .subscribe((products) => {
                this.products = products;
              });
          }
        }
      }
    }
  }
}
