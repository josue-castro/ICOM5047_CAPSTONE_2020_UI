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
import { CartService } from 'src/app/data/services/cart.service';

// Helpers
import * as DateManager from 'src/app/helpers/expiration';

@Component({
  selector: 'product-list[cart]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: Cart;
  @Output() cartChange: EventEmitter<Cart> = new EventEmitter<Cart>();

  isLoading: boolean;
  products: Product[];
  selectedProduct: Product;
  showDetails: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
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
          });
      } else if (!change.firstChange && !change.currentValue) {
        // Cart input changed to null
        this.selectedProduct = null;
        this.showDetails = false;
        this.products = [];
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
      cartName: this.cart.cartName,
    };

    const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      // When dialog closed check if data was sent
      if (data) {
        // Add product to cart
        const prod = {
          cartId: this.cart.cartId,
          lotId: data,
        };
        this.addProduct(prod as Product);
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
      products: this.products.map((product) => ({
        id: product.productId,
        lotId: product.lotId,
      })),
    };

    const dialogRef = this.dialog.open(
      RemoveProductsDialogComponent,
      dialogConfig
    );
    /* When dialog closed verify if data was sent. If data was sent it returns an array
    of ids from products to be removed  */
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.removeProducts(data);
      }
    });
  }

  private addProduct(product: Product) {
    this.productService.addProduct(product).subscribe((prod) => {
      if (prod) {
        // If new product has expiration wanring, update cart's expiration warning count
        if (DateManager.isExpired(prod.expirationDate)) {
          this.cart.expiredWarningCount++;
          this.cartChange.emit(this.cart);
        }
        // If new product has near expiration warning, update cart's  near expiration warning count
        if (DateManager.isNearExpiration(prod.expirationDate, 7)) {
          this.cart.nearExpirationDateWarningCount++;
          this.cartChange.emit(this.cart);
        }
        // If new product has location discrepancy set cart's discrepancy true
        if (prod.virtualSiteName != this.cart.siteName) {
          this.cart.discrepancyExists = true;
          this.cartChange.emit(this.cart);
        }

        // Add product to UI
        this.products.push(prod);
        this._snackBar.open('Product added to cart.', undefined, {
          duration: 2000,
        });
      }
    });
  }

  private removeProducts(productIds: number[]) {
    productIds.forEach((id) => {
      this.productService.deleteProduct(id).subscribe((_) => {
        // Close details and null selected product if the selected product was deleted
        if (this.selectedProduct && this.selectedProduct.productId == id) {
          this.selectedProduct = null;
          this.showDetails = false;
        }
        // Get product to be deleted
        const rmProd: Product = this.products.find(
          (product) => product.productId == id
        );
        // If the product removed had expiration warning, update cart's warning count
        if (DateManager.isExpired(rmProd.expirationDate)) {
          this.cart.expiredWarningCount--;
          this.cartChange.emit(this.cart);
        }
        // If the product removed had near expiration warning, update cart's near expiration warning count
        if (DateManager.isNearExpiration(rmProd.expirationDate, 7)) {
          this.cart.nearExpirationDateWarningCount--;
          this.cartChange.emit(this.cart);
        }

        // On success remove product from UI
        this.products = this.products.filter(
          (product) => product.productId != id
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
