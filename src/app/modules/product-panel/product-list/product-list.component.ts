import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
// Dialogs
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../dialogs/add-product-dialog/add-product-dialog.component';
import { RemoveProductsDialogComponent } from '../dialogs/remove-products-dialog/remove-products-dialog.component';

// Snackbar
import { MatSnackBar } from '@angular/material/snack-bar';

// Models
import { Product } from 'src/app/data/models/Product';
import { Cart } from 'src/app/data/models/Cart';
// Services
import { ProductService } from 'src/app/data/services/product.service';

// Helpers
import * as DateManager from 'src/app/helpers/expiration';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'product-list[cart]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: Cart;
  @Output() cartChange: EventEmitter<Cart> = new EventEmitter<Cart>();

  isLoading: boolean;
  // products array that is listed in the UI this array changes when a search is done
  products: Product[];
  // Keep a copy of the products in the cart to update discrepancy in UI when removing a product.
  // This array does not change and keeps all the products in this.cart
  productsCopy: Product[];
  selectedProduct: Product;
  showDetails: boolean = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      let change = changes['cart'];
      // If cart input changed and is not null, load products in the cart
      if (!change.firstChange && change.currentValue) {
        // Reset selectedProduct and hide details
        this.selectedProduct = null;
        this.showDetails = false;
        this.isLoading = true;
        // Look for products in the cart selected by cartId
        this.productService
          .getProductsByCartId(change.currentValue.cartId)
          .subscribe((products) => {
            this.isLoading = false;
            this.products = products;
            this.productsCopy = products;
          });
      } else if (!change.firstChange && !change.currentValue) {
        // Cart input changed to null
        this.selectedProduct = null;
        this.showDetails = false;
        this.products = [];
        this.productsCopy = [];
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
      top: '',
      bottom: '',
      left: '',
      right: '',
    };

    dialogConfig.data = {
      cart: this.cart,
    };

    const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // When dialog closed check if data was sent. If data was sent product was added.
      // Product is added in the AddProductDialogComponent
      if (result) {
        // Add product to UI
        this.products.push(result.product);
        // Add product to copy array
        this.productsCopy.push(result.prodcut);
        // Update UI warning counts and discrepancy by updating cart
        this.cartChange.emit(result.cart);

        // Notify user
        this._snackBar.open('Product added to cart.', undefined, {
          duration: 2000,
        });
      }
    });
  }

  removeProductDialog() {
    // Dialog properties
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    // Have dialog float in screen center
    dialogConfig.position = {
      top: '',
      bottom: '',
      left: '',
      right: '',
    };

    /* When removing prodcuts from a cart pass the cart name so user knows which cart he selected.
     Pass information necessary to remove a product which is the (productId) and pass the (lotId)
     so the user knows which products to select */
    dialogConfig.data = {
      cartName: this.cart.cartName,
      products: this.products,
    };

    const dialogRef = this.dialog.open(
      RemoveProductsDialogComponent,
      dialogConfig
    );
    /* When dialog closed verify if data was sent. If data was sent it returns an array
    of ids from products to be removed  */
    dialogRef.afterClosed().subscribe((products) => {
      if (products) {
        this.removeProducts(products);
      }
    });
  }

  private removeProducts(products: Product[]) {
    products.forEach((product) => {
      this.productService.deleteProduct(product).subscribe((_) => {
        // It the product to be deleted is the selectedProduct, hide details and reset selectedProduct
        if (
          this.selectedProduct &&
          this.selectedProduct.productId == product.productId
        ) {
          this.selectedProduct = null;
          this.showDetails = false;
        }

        // If the product removed had expiration warning, update cart's warning count
        if (DateManager.isExpired(product.expirationDate)) {
          this.cart.expiredWarningCount--;
          this.cartChange.emit(this.cart);
        }
        // If the product removed had near expiration warning, update cart's near expiration warning count
        if (DateManager.isNearExpiration(product.expirationDate, 7)) {
          this.cart.nearExpirationDateWarningCount--;
          this.cartChange.emit(this.cart);
        }

        //Remove product from productsCopy that has all cart products
        this.productsCopy = this.productsCopy.filter(
          (p) => p.productId != product.productId
        );

        // If product had discrepancy verify if it was the only causing it
        // Update cart discrepancy if necessary
        if (product.discrepancyExists) {
          // Check discrepancy in the productsCopy array since it has all the cart products
          if (
            this.productsCopy.filter((p) => p.discrepancyExists).length == 0
          ) {
            this.cart.discrepancyExists = false;
            this.cartChange.emit(this.cart);
          }
        }

        // Remove product from UI this.products
        this.products = this.products.filter(
          (p) => p.productId != product.productId
        );
      });
    });
    this._snackBar.open('Products removed from cart', undefined, {
      duration: 2000,
    });
  }

  searchProducts(searchForm) {
    const { term, searchBy, filterBy } = searchForm;
    this.isLoading = true;
    this.selectedProduct = null;
    this.showDetails = false;
    this.productService
      .searchProduct(this.cart.cartId, term, searchBy, filterBy)
      .subscribe((results) => {
        this.isLoading = false;
        this.products = results;
      });
  }
}
