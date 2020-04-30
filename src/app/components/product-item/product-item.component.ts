import { Component, OnInit, Input } from '@angular/core';
import * as dateManager from 'src/app/helpers/expiration';

// Model
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit(): void {}

  isExpired(): boolean {
    return dateManager.isExpired(this.product.expDate);
  }

  isNearExpiration(): boolean {
    return dateManager.isNearExpiration(this.product.expDate, 7);
  }
}
