import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cart } from 'src/app/data/models/Cart';
import { Product } from 'src/app/data/models/Product';
import { ProductService } from 'src/app/data/services/product.service';
import * as DateManager from 'src/app/helpers/expiration';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css'],
})
export class AddProductDialogComponent {
  LotId = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(17),
    Validators.pattern('[a-zA-Z0-9-_]+'),
  ]);
  cart: Cart;

  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.cart = data.cart;
  }

  getErrorMessages() {
    if (this.LotId.hasError('required')) {
      return 'You must enter a lot id.';
    } else if (this.LotId.hasError('pattern')) {
      return 'Only letters, numbers, hyphens (-) and underscore (_) allowed';
    } else if (this.LotId.hasError('minlength')) {
      return 'Minimum of 13 characters required.';
    } else if (this.LotId.hasError('maxlength')) {
      return 'Maximum of 17 characters allowed.';
    } else if (this.LotId.hasError('serverError')) {
      return this.LotId.errors.serverError;
    }
  }

  close() {
    this.dialogRef.close();
  }

  addProduct() {
    if (this.LotId.valid) {
      // Create product to be added
      const newProduct = {
        lotId: this.LotId.value,
        cartId: this.cart.cartId,
      };
      this.productService.addProduct(newProduct as Product).subscribe(
        (product) => {
          // If new product has expiration warning, update cart's expiration warning count
          if (DateManager.isExpired(product.expirationDate)) {
            this.cart.expiredWarningCount++;
          }
          // If new product has near expiration warning, update cart's  near expiration warning count
          if (DateManager.isNearExpiration(product.expirationDate, 7)) {
            this.cart.nearExpirationDateWarningCount++;
          }
          // If new product has location discrepancy set cart's discrepancy true
          if (product.virtualSiteName != this.cart.siteName) {
            this.cart.discrepancyExists = true;
            product.discrepancyExists = true;
          }
          this.dialogRef.close({ product: product, cart: this.cart });
        },
        (err) => {
          // Get backend error message
          if (err instanceof HttpErrorResponse) {
            if (err.status == 400) {
              const validationError = err.error;
              if (validationError['LotId']) {
                this.LotId.setErrors({
                  serverError: validationError['LotId'],
                });
              }
            }
          }
        }
      );
    }
  }
}
