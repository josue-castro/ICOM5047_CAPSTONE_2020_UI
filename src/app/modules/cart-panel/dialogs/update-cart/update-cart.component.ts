import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.css'],
})
export class UpdateCartComponent implements OnInit {
  carts: Cart[];
  cartToUpdate: Cart;
  cartUpd = new FormGroup({
    TagAddress: new FormControl('xDECA', [
      Validators.required,
      Validators.pattern('^xDECA[0-9A-Z]*'),
      Validators.minLength(14),
      Validators.maxLength(17),
    ]),
    CartName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9_-]+'),
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
  });

  constructor(
    private dialogRef: MatDialogRef<UpdateCartComponent>,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.carts = data.carts;
  }

  ngOnInit(): void {}

  tagErrMsg() {
    if (this.cartUpd.get('TagAddress').hasError('required')) {
      return 'You must enter tag address.';
    } else if (this.cartUpd.get('TagAddress').hasError('pattern')) {
      return 'Capital letters or numbers after xDECA.';
    } else if (this.cartUpd.get('TagAddress').hasError('minlength')) {
      return 'Minimum of 14 characters.';
    } else if (this.cartUpd.get('TagAddress').hasError('maxlength')) {
      return 'Maximum of 17 characters.';
    } else if (this.cartUpd.get('TagAddress').hasError('serverError')) {
      return this.cartUpd.get('TagAddress').errors.serverError;
    }
  }

  nameErrMsg() {
    if (this.cartUpd.get('CartName').hasError('required')) {
      return 'You must assign the cart a name';
    } else if (this.cartUpd.get('CartName').hasError('pattern')) {
      return 'Only letters, numbers, hyphens (-) and underscore (_) allowed';
    } else if (this.cartUpd.get('CartName').hasError('minlength')) {
      return 'Minimum of 6 characters.';
    } else if (this.cartUpd.get('CartName').hasError('maxlength')) {
      return 'Maximum of 16 characters.';
    } else if (this.cartUpd.get('CartName').hasError('serverError')) {
      return this.cartUpd.get('CartName').errors.serverError;
    }
  }

  close() {
    this.dialogRef.close();
  }

  update() {}
}
