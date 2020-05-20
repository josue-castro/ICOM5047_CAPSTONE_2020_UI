import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'remove-products-dialog',
  templateUrl: './remove-products-dialog.component.html',
  styleUrls: ['./remove-products-dialog.component.css'],
})
export class RemoveProductsDialogComponent {
  cartId: number;
  productList: [{ id: number; lotId: string }];
  products = new FormControl([]);

  constructor(
    private dialogRef: MatDialogRef<RemoveProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.cartId = data.cartId;
    this.productList = data.products;
  }

  close() {
    this.dialogRef.close();
  }

  removeProducts() {
    this.dialogRef.close(this.products.value);
  }
}
