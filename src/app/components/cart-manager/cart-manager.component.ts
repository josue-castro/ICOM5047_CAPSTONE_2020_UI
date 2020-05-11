import { Component, OnInit } from '@angular/core';
import * as dateManager from 'src/app/helpers/expiration';

// Models
import { Cart } from '../../data/models/Cart';
import { Product } from '../../data/models/Product';

// Services
import { CartService } from '../../data/services/cart.service';
import { ProductService } from '../../data/services/product.service';

@Component({
  selector: 'app-cart-manager',
  templateUrl: './cart-manager.component.html',
  styleUrls: ['./cart-manager.component.css'],
})
export class CartManagerComponent implements OnInit {
  // Cart related variables
  selectedCart: Cart;
  carts: Cart[];
  cartSearchKey = [
    { value: 'cartId', viewValue: 'Cart ID' },
    { value: 'lotId', viewValue: 'Lot ID' },
    { value: 'productName', viewValue: 'Product Name' },
    { value: 'expDate', viewValue: 'Expiration Date' },
  ];

  // Product related variables
  selectedProduct: Product;
  products: Product[];
  productSearchKey = [
    { value: 'lotId', viewValue: 'Lot ID' },
    { value: 'productName', viewValue: 'Product Name' },
    { value: 'expDate', viewValue: 'Expiration Date' },
  ];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
    });
  }

  cartSelect(cart: Cart): void {
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

  searchCart(key: string, term: string) {
    if (!term) {
      this.cartService.getCarts().subscribe((carts) => {
        this.carts = carts;
      });
    } else {
      switch (key) {
        case 'lotId':
          this.cartService
            .getCartContainingProductLotId(term)
            .subscribe((carts) => {
              this.carts = carts;
            });
          break;
        case 'productName':
          this.cartService
            .getCartsContainingProductName(term)
            .subscribe((carts) => {
              this.carts = carts;
            });
          break;
      }
    }
  }

  searchProduct(cartId: number, key: string, term: string) {
    if (!term) {
      this.productService
        .getProductsByCartId(this.selectedCart.id)
        .subscribe((products) => {
          this.products = products;
        });
    } else {
      this.productService
        .productSearch(cartId, key, term)
        .subscribe((products) => {
          this.products = products;
        });
    }
  }

  isExpired(product: Product): boolean {
    return dateManager.isExpired(product.expDate);
  }

  isNearExpiration(product: Product): boolean {
    // Product is considered near expiration when expiration date is within a week
    // returns false if product has already expired
    return dateManager.isNearExpiration(product.expDate, 7);
  }
}
