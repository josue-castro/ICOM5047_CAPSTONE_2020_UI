import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css'],
})
export class AddProductDialogComponent {
  LotId = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(20),
    Validators.pattern('[a-zA-Z0-9-_]+$'),
  ]);
  cartName: string;

  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.cartName = data.cartName;
  }

  getErrorMessages() {
    if (this.LotId.hasError('required')) {
      return 'You must enter a lot id';
    } else if (this.LotId.hasError('pattern')) {
      return "Valid characters a-z, A-Z, 0-9, '-', '_'";
    } else if (this.LotId.hasError('minlength')) {
      return 'Minimum of 13 characters required';
    } else if (this.LotId.hasError('maxlength')) {
      return 'Maximum of 20 characters allowed';
    }
  }

  close() {
    this.dialogRef.close();
  }

  addProduct() {
    this.dialogRef.close(this.LotId.value);
  }
}
