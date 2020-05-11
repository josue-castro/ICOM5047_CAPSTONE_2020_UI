import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CartPanelModule } from './modules/cart-panel/cart-panel.module';
import { ProductPanelModule } from './modules/product-panel/product-panel.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/in-memory-data.service';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CartManagerComponent } from './components/cart-manager/cart-manager.component';
import { ProductSearchPipe } from './pipes/product-search.pipe';

import { MaterialDesignModule } from './material-design/material-design.module';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CartManagerComponent,
    ProductSearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartPanelModule,
    ProductPanelModule,
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
