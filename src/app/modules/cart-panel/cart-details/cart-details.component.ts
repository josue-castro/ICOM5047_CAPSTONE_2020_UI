import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';

@Component({
  selector: 'cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  @Input() opened: boolean = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() closed: EventEmitter<boolean> = new EventEmitter();

  @Input() cart: Cart;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);
    this.closed.emit(!this.opened);
  }

  open() {
    this.opened = true;
    this.openedChange.emit(this.opened);
    this.closed.emit(!this.opened);
  }

  close() {
    this.opened = false;
    this.openedChange.emit(this.opened);
    this.closed.emit(!this.opened);
  }
}
