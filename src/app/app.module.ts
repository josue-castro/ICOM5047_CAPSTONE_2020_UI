import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartManagerComponent } from './components/cart-manager/cart-manager.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchPipe } from './pipes/product-search.pipe';

import { MaterialDesignModule } from './material-design/material-design.module';
import { TestComponent } from './components/test/test.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CartListComponent,
    CartManagerComponent,
    ProductListComponent,
    ProductSearchPipe,
    TestComponent,
    ProductItemComponent,
    CartItemComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    FormsModule,
    MaterialDesignModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
