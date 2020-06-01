import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/data/models/Product';

/*
 * This components shows the product's details of the selected product from the ptoduct-list component
 * It is to be treated as a panel that can be opened and closed. Emits event when opens and closes
 * The component is used in product-list
 */
@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;

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
