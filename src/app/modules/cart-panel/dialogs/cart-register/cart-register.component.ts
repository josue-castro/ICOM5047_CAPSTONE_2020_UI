import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

// Dialog component to handle cart registrations
@Component({
  selector: 'cart-register',
  templateUrl: './cart-register.component.html',
  styleUrls: ['./cart-register.component.css'],
})
export class CartRegisterComponent implements OnInit {
  cartReg = new FormGroup({
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
    private dialogRef: MatDialogRef<CartRegisterComponent>,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  tagErrMsg() {
    if (this.cartReg.get('TagAddress').hasError('required')) {
      return 'You must enter tag address.';
    } else if (this.cartReg.get('TagAddress').hasError('pattern')) {
      return 'Capital letters or numbers after xDECA.';
    } else if (this.cartReg.get('TagAddress').hasError('minlength')) {
      return 'Minimum of 14 characters.';
    } else if (this.cartReg.get('TagAddress').hasError('maxlength')) {
      return 'Maximum of 17 characters.';
    } else if (this.cartReg.get('TagAddress').hasError('serverError')) {
      return this.cartReg.get('TagAddress').errors.serverError;
    }
  }

  nameErrMsg() {
    if (this.cartReg.get('CartName').hasError('required')) {
      return 'You must assign the cart a name';
    } else if (this.cartReg.get('CartName').hasError('pattern')) {
      return 'Only letters, numbers, hyphens (-) and underscore (_) allowed';
    } else if (this.cartReg.get('CartName').hasError('minlength')) {
      return 'Minimum of 6 characters.';
    } else if (this.cartReg.get('CartName').hasError('maxlength')) {
      return 'Maximum of 16 characters.';
    } else if (this.cartReg.get('CartName').hasError('serverError')) {
      return this.cartReg.get('CartName').errors.serverError;
    }
  }

  close() {
    this.dialogRef.close();
  }

  register() {
    if (this.cartReg.valid) {
      // If the form is valid create the new cart to be added
      const newCart = {
        cartName: this.cartReg.get('CartName').value,
        tagAddress: this.cartReg.get('TagAddress').value,
      };
      this.cartService.addCart(newCart as Cart).subscribe(
        (cart) => {
          // Send the new cart created through the cartService so that the cart-list component can catch it
          // action 'register' to update the UI accordingly
          this.cartService.sendCartAction(cart, 'register');
          this.snackBar.open('Cart registered', undefined, {
            duration: 2000,
          });
          this.dialogRef.close();
        },
        (err) => {
          // Get backend errors
          if (err instanceof HttpErrorResponse) {
            if (err.status == 400) {
              const validationErrors = err.error;
              Object.keys(validationErrors).forEach((prop) => {
                // Try to match error messages to form controllers
                const formControl = this.cartReg.get(prop);
                // If error matched a controller set the error message
                if (formControl) {
                  formControl.setErrors({
                    serverError: validationErrors[prop],
                  });
                }
              });
            }
          }
        }
      );
    }
  }
}
