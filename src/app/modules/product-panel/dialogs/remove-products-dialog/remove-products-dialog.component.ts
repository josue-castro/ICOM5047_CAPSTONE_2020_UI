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
    const deleteCalls = []; // Get all delete calls to perform them at once
    this.deleteProducts.value.forEach((product) => {
      // If the product to be removed had expiration warning, update cart's warning count
      if (DateManager.isExpired(product.expirationDate)) {
        this.cart.expiredWarningCount--;
      }
      // If the product to be removed had near expiration warning, update cart's near expiration warning count
      if (DateManager.isNearExpiration(product.expirationDate, 7)) {
        this.cart.nearExpirationDateWarningCount--;
      }
      // Add delete call
      deleteCalls.push(this.productService.deleteProduct(product));
    });
    // Fork join to call all delete methods at once
    forkJoin(deleteCalls).subscribe(() => {
      // All delete call where perform without error.

      // Get Ids of deleted products to return when dialog close
      const deletedIds = this.deleteProducts.value.map((p) => p.productId);
      //Check if there is still discrepancy in cart by checking the remaining products.
      //If no products with discrepancy set cart discrepancy to false.
      // productList original products in cart. Exclude deleted products and check discrepancy
      if (
        this.productList.filter(
          (p) => !deletedIds.includes(p.productId) && p.discrepancyExists
        ).length == 0
      ) {
        this.cart.discrepancyExists = false;
      }
      //Send deletedIds and updated Cart to update UI
      this.dialogRef.close({ deletedIds, cart: this.cart });
    });
  }
}
