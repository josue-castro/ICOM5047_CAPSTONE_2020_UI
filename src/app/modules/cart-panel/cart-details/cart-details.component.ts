import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';

@Component({
  selector: 'cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  @Input() cart: Cart;

  constructor() {}

  ngOnInit(): void {}
}
