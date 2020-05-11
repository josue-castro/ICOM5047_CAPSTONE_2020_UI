import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cart: Cart;
  @Output() cartSelect: EventEmitter<Cart> = new EventEmitter();

  warnTitle: string;
  expTitle: string;

  constructor() {}

  ngOnInit(): void {
    this.warnTitle = `Cart contains ${this.cart.nearExpDateWarnCount} product(s) expiring within a week.`;
    this.expTitle = `Cart contains ${this.cart.expWarnCount} expired product(s).`;
  }

  onSelect(cart: Cart) {
    this.cartSelect.emit(cart);
  }
}
