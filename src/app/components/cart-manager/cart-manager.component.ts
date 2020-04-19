import { Component, OnInit } from '@angular/core';

// Models
import { Cart } from '../../models/Cart';
import { Product } from '../../models/Product';

// Services
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart-manager',
  templateUrl: './cart-manager.component.html',
  styleUrls: ['./cart-manager.component.css'],
})
export class CartManagerComponent implements OnInit {
  selectedCart: Cart;
  selectedProduct: Product;
  carts: Cart[];
  products: Product[];

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
    this.selectedCart = cart;
    this.productService
      .getProductsByCartId(this.selectedCart.id)
      .subscribe((products) => {
        this.products = products;
      });
  }
}
