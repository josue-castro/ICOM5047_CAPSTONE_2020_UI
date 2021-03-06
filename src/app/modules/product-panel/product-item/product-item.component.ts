import { Component, OnInit, Input } from '@angular/core';
import * as dateManager from 'src/app/helpers/expiration';

// Model
import { Product } from 'src/app/data/models/Product';

//Component use to render product items in the product-list component

@Component({
  selector: 'product-item[product]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit(): void {}

  isExpired(): boolean {
    return dateManager.isExpired(this.product.expirationDate);
  }

  isNearExpiration(): boolean {
    return dateManager.isNearExpiration(this.product.expirationDate, 7);
  }
}
