import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '../../material-design/material-design.module';
import { SharedModule } from '../../components/shared.module';

import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';

const components = [ProductItemComponent, ProductListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule, MaterialDesignModule],
  exports: [...components],
})
export class ProductPanelModule {}
