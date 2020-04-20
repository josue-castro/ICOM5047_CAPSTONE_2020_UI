import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

// Models
import { Product } from '../../models/Product';
// Services
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cartId: number;

  products: Product[];
  selectedProduct: Product;
  searchTerm;
  searchParams: string[] = ['id', 'lotId'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.productService
      .getProductsByCartId(changes.cartId.currentValue)
      .subscribe((products) => {
        this.products = products;
      });
  }
}
