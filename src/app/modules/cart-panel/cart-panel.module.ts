import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../../material-design/material-design.module';
import { SharedModule } from '../../components/shared.module';

import { CartItemComponent } from './cart-item/cart-item.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartSearchComponent } from './cart-search/cart-search.component';
import { CartRegisterComponent } from './dialogs/cart-register/cart-register.component';
import { DeleteCartComponent } from './dialogs/delete-cart/delete-cart.component';

const components = [
  CartItemComponent,
  CartListComponent,
  CartDetailsComponent,
  CartSearchComponent,
  CartRegisterComponent,
  DeleteCartComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialDesignModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...components],
})
export class CartPanelModule {}
