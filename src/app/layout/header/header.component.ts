import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartRegisterComponent } from 'src/app/modules/cart-panel/dialogs/cart-register/cart-register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

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
}
