import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';

@Component({
  selector: 'cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  @Input() cart: Cart;

  @Input() opened: boolean = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();
  @Output('opened') openedStart = new EventEmitter();
  @Output('closed') closedStart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);

    if (this.opened) {
      this.openedStart.emit();
    } else {
      this.closedStart.emit();
    }
  }

  open() {
    if (!this.opened) {
      this.opened = true;
      this.openedChange.emit(this.opened);
      this.openedStart.emit();
    }
  }

  close() {
    if (this.opened) {
      this.opened = false;
      this.openedChange.emit(this.opened);
      this.closedStart.emit();
    }
  }
}
