import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '../../material-design/material-design.module';
import { SharedModule } from '../../components/shared.module';

import { CartItemComponent } from './cart-item/cart-item.component';
import { CartListComponent } from './cart-list/cart-list.component';

const components = [CartItemComponent, CartListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MaterialDesignModule, SharedModule],
  exports: [...components],
})
export class CartPanelModule {}
