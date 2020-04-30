import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  carts: Cart[];
  selectedCart: Cart;
  constructor(private cartService: CartService) {}

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
    }
  }
}
