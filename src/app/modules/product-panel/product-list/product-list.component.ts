import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../dialogs/add-product-dialog/add-product-dialog.component';
import { RemoveProductsDialogComponent } from '../dialogs/remove-products-dialog/remove-products-dialog.component';

// Models
import { Product } from 'src/app/data/models/Product';
import { Cart } from 'src/app/data/models/Cart';
// Services
import { ProductService } from '../../../data/services/product.service';
import * as dateManager from 'src/app/helpers/expiration';

@Component({
  selector: 'product-list[cart]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: Cart;

  isLoading: boolean;
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product;
  showDetails: boolean = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      let change = changes['cart'];
      if (!change.firstChange && change.currentValue) {
        this.selectedProduct = null;
        this.showDetails = false;
        this.isLoading = true;
        this.productService
          .getProductsByCartId(change.currentValue.id)
          .subscribe((products) => {
            this.isLoading = false;
            this.products = products;
            this.filteredProducts = this.products;
          });
      } else if (!change.firstChange && !change.currentValue) {
        // Cart input changed to null
        this.selectedProduct = null;
        this.showDetails = false;
        this.products = [];
        this.filteredProducts = [];
      }
    }
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.showDetails = true;
  }

  addProductDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '0',
      left: '0',
    };

    dialogConfig.data = {
      cartId: this.cart.id,
    };

    const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => console.log(data));
  }

  removeProductDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '0',
      left: '0',
    };

    dialogConfig.data = {
      cartId: this.cart.id,
      products: this.products.map((product) => ({
        id: product.id,
        lotId: product.lotId,
      })),
    };

    const dialogRef = this.dialog.open(
      RemoveProductsDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => console.log(data));
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe((product) => {
      // TODO add product to products array
      console.log(product);
    });
  }
  // This search executes in the internal array this.products
  // All searchable parameters are contained within product objects
  filterProducts(searchForm) {
    // searchForm is the event emitted by the (search) event in the product-search component
    const { term, searchBy, filterBy } = searchForm;
    let result: Product[];

    // If no term was specified set result to all products
    if (!term) {
      console.log('entro');
      result = this.products;
    } else {
      // Search for term in searchBy category
      result = this.products.filter((product) =>
        product[searchBy].toLowerCase().startsWith(term.toLowerCase())
      );
    }

    // if Filter was specified filter the result array
    switch (filterBy) {
      case 'expired':
        result = result.filter((product) =>
          dateManager.isExpired(product.expDate)
        );
        break;
      case 'nearExp':
        result = result.filter((product) =>
          dateManager.isNearExpiration(product.expDate, 7)
        );
        break;
    }
    this.filteredProducts = result;
  }
}
