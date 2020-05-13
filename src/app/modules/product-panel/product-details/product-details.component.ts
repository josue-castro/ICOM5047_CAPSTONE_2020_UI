import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/data/models/Product';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() opened: boolean = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() closed: EventEmitter<boolean> = new EventEmitter();

  @Input() product: Product;

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
