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
  selector: 'product-list[cart]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: Cart;

  products: Product[];
  selectedProduct: Product;
  showDetails: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      let change = changes['cart'];
      if (!change.isFirstChange()) {
        this.productService
          .getProductsByCartId(change.currentValue.id)
          .subscribe((products) => {
            this.products = products;
          });
      }
    }
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.showDetails = true;
  }

  searchProduct(searchForm) {
    console.log(searchForm);
  }
}
