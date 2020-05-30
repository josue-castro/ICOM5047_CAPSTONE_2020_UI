import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/data/models/Product';

@Component({
  selector: 'remove-products-dialog',
  templateUrl: './remove-products-dialog.component.html',
  styleUrls: ['./remove-products-dialog.component.css'],
})
export class RemoveProductsDialogComponent {
  cartName: String;
  productList: Product[];
  products = new FormControl([]);

  constructor(
    private dialogRef: MatDialogRef<RemoveProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.cartName = data.cartName;
    this.productList = data.products;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  removeProducts() {
    // send products product-list component and remove them there to update the UI
    this.dialogRef.close(this.products.value);
  }
}
