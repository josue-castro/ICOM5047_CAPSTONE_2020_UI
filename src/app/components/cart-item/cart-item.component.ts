import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cart: Cart;
  @Output() cartSelected: EventEmitter<Cart> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectCart(cart: Cart) {
    this.cartSelected.emit(cart);
  }
}
