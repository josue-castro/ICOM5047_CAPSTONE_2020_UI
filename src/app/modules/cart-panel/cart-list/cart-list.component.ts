import { Component, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  isLoading: boolean;
  carts: Cart[];
  selectedCart: Cart;
  cartDetails: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.cartService.getCarts().subscribe((carts) => {
      this.isLoading = false;
      this.carts = carts;
    });
  }

  selectCart(cart: Cart): void {
    this.selectedCart = cart;
    this.cartDetails = true;
  }

  searchCart(searchForm) {
    console.log(searchForm);
  }

  open() {
    console.log('open');
  }
}
