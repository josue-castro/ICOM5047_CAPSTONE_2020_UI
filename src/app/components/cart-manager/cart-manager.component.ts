import { Component, OnInit } from '@angular/core';

// Models
import { Cart } from '../../models/Cart';
import { Product } from '../../models/Product';

// Services
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

// Pipes
import { ProductSearchPipe } from '../../pipes/product-search.pipe';

@Component({
  selector: 'app-cart-manager',
  templateUrl: './cart-manager.component.html',
  styleUrls: ['./cart-manager.component.css'],
})
export class CartManagerComponent implements OnInit {
  // Cart related variables
  selectedCart: Cart;
  carts: Cart[];

  // Product related variables
  selectedProduct: Product;
  products: Product[];
  searchText;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
    });
  }

  onCartSelect(cart: Cart): void {
    // Issue: Repetitively fetching products even when selectedCart was equal to cart.
    // Resolved: Only fetch if the selected cart is different to the previous cart
    if (!this.selectedCart || this.selectedCart !== cart) {
      this.selectedCart = cart;
      this.productService
        .getProductsByCartId(this.selectedCart.id)
        .subscribe((products) => {
          this.products = products;
        });
    }
  }

  isExpired(product: Product): boolean {
    const productExpDate = new Date(product.expDate).getTime();
    const currentDate = new Date().getTime();
    return productExpDate < currentDate;
  }

  isNearExpiration(product: Product): boolean {
    // Product is considered near expiration when expiration date is within a week
    // returns false if product has already expired
    const oneWeek = 24 * 3600 * 1000 * 7;
    const productExpDate = new Date(product.expDate).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = productExpDate - currentDate;

    return timeDifference <= oneWeek && timeDifference > 0;
  }
}
