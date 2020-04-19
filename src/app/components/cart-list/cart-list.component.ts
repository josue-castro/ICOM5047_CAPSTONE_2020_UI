import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/Cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  carts: Cart[];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
    });
  }
}
