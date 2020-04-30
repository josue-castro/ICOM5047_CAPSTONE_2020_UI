import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

// Models
import { Product } from 'src/app/models/Product';
import { Cart } from 'src/app/models/Cart';
// Services
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: number;

  products: Product[];
  selectedProduct: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsByCartId(2).subscribe((products) => {
      this.products = products;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productService
      .getProductsByCartId(changes.cartId.currentValue)
      .subscribe((products) => {
        this.products = products;
      });
  }
}
