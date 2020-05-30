import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'delete-cart',
  templateUrl: './delete-cart.component.html',
  styleUrls: ['./delete-cart.component.css'],
})
export class DeleteCartComponent {
  carts: Cart[];
  cartToDelete: Cart;
  confirm = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<DeleteCartComponent>,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.carts = data.carts;
  }

  close() {
    this.dialogRef.close();
  }
  delete() {
    if (this.confirm.value != this.cartToDelete.cartName) {
      this.confirm.setErrors({ confirmationError: 'Cart name does not match' });
    }
    if (this.confirm.valid) {
      this.cartService.deleteCart(this.cartToDelete).subscribe((_) => {
        this.snackBar.open('Cart deleted', undefined, {
          duration: 2000,
        });
        this.dialogRef.close();
      });
    }
  }
}
