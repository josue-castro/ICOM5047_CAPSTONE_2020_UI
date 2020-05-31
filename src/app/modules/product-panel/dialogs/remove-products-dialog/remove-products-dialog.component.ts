import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/data/models/Product';
import { ProductService } from 'src/app/data/services/product.service';
import { Cart } from 'src/app/data/models/Cart';
import * as DateManager from 'src/app/helpers/expiration';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'remove-products-dialog',
  templateUrl: './remove-products-dialog.component.html',
  styleUrls: ['./remove-products-dialog.component.css'],
})
export class RemoveProductsDialogComponent {
  cart: Cart;
  productList: Product[];
  deleteProducts = new FormControl([]);

  constructor(
    private dialogRef: MatDialogRef<RemoveProductsDialogComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.cart = data.cart;
    this.productList = data.products;
  }

  close() {
    this.dialogRef.close(undefined);
  }

  removeProducts() {
    // send products product-list component and remove them there to update the UI
    // this.dialogRef.close(this.products.value);
    const deleteCalls = [];
    this.deleteProducts.value.forEach((product) => {
      // If the product to be removed had expiration warning, update cart's warning count
      if (DateManager.isExpired(product.expirationDate)) {
        this.cart.expiredWarningCount--;
      }
      // If the product to be removed had near expiration warning, update cart's near expiration warning count
      if (DateManager.isNearExpiration(product.expirationDate, 7)) {
        this.cart.nearExpirationDateWarningCount--;
      }
      deleteCalls.push(this.productService.deleteProduct(product));
    });
    forkJoin(deleteCalls).subscribe(() => {
      // Get Ids of deleted products to return when dialog close
      const deletedIds = this.deleteProducts.value.map((p) => p.productId);
      //Check if there is still discrepancy in cart by checking the remaining products
      // If no products with discrepancy set cart discrepancy to false
      if (
        this.productList.filter(
          (p) => !deletedIds.includes(p.productId) && p.discrepancyExists
        ).length == 0
      ) {
        this.cart.discrepancyExists = false;
      }
      this.dialogRef.close({ deletedIds, cart: this.cart });
    });
  }
}
