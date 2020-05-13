import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../../material-design/material-design.module';
import { SharedModule } from '../../components/shared.module';

import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSearchComponent } from './product-search/product-search.component';

const components = [
  ProductItemComponent,
  ProductListComponent,
  ProductDetailsComponent,
  ProductSearchComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SharedModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...components],
})
export class ProductPanelModule {}
