import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { CartRegisterComponent } from 'src/app/modules/cart-panel/dialogs/cart-register/cart-register.component';
import { CartService } from 'src/app/data/services/cart.service';
import { DeleteCartComponent } from 'src/app/modules/cart-panel/dialogs/delete-cart/delete-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog, private cartService: CartService) {}

  ngOnInit(): void {}

  registerCart() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.position = {
      top: '',
      bottom: '',
      left: '',
      right: '',
    };
    this.dialog.open(CartRegisterComponent, dialogConfig);
  }

  deleteCart() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.position = {
      top: '',
      bottom: '',
      left: '',
      right: '',
    };

    let dialogRef: MatDialogRef<any>;
    this.cartService.getCarts().subscribe((carts) => {
      dialogConfig.data = { carts: carts };
      dialogRef = this.dialog.open(DeleteCartComponent, dialogConfig);
    });

    // dialogRef.afterClosed()
  }
}
