import { Component, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  carts: Cart[];
  selectedCart: Cart;
  showDetails: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
    });
  }

  onSelect(cart: Cart): void {
    this.selectedCart = cart;
    this.showDetails = true;
  }

  searchCart(searchForm) {
    console.log(searchForm);
  }
}
