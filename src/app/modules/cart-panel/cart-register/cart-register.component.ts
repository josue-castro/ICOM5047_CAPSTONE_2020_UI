import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';

@Component({
  selector: 'cart-register',
  templateUrl: './cart-register.component.html',
  styleUrls: ['./cart-register.component.css'],
})
export class CartRegisterComponent implements OnInit {
  tagAddress = new FormControl('xDECA', [
    Validators.required,
    Validators.pattern('^xDECA[0-9A-Z]+$'),
    Validators.maxLength(17),
  ]);

  constructor(
    private dialogRef: MatDialogRef<CartRegisterComponent>,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const post = { tagAddress: data };
        this.cartService
          .addCart(post as Cart)
          .subscribe((res) => console.log(res));
      }
    });
  }

  getErrorMessages() {
    if (this.tagAddress.hasError('required')) {
      return 'You must enter tag address';
    } else if (this.tagAddress.hasError('pattern')) {
      return 'Wrong format.';
    }
    return this.tagAddress.hasError('maxlength') ? 'Max length 17' : '';
  }
  close() {
    this.dialogRef.close();
  }

  register() {
    this.dialogRef.close(this.tagAddress.value);
  }
}
