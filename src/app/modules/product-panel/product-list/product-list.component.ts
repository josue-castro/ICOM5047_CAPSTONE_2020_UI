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

/**
 * This component shows the list of prodcuts, updates the UI when products
 * are added or removed. Update the cart information and performs search on products
 */
@Component({
  selector: 'product-list[cart]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() cart: Cart;
  @Output() cartChange: EventEmitter<Cart> = new EventEmitter<Cart>();

  isLoading: boolean;
  // products array lists products in the UI. This array changes when a search is done
  products: Product[];
  // Keep a copy of the products in the cart to update discrepancy in UI when removing a product.
  // This array does not change and keeps all the products in this.cart
  productsCopy: Product[] = [];
  selectedProduct: Product;
  // Control opening and close of the cart-details component
  showDetails: boolean = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectedProduct = null;
    this.showDetails = false;
    this.isLoading = true;
    // Look for products in the cart selected by cartId
    this.productService
      .getProductsByCartId(this.cart.cartId)
      .subscribe((products) => {
        this.isLoading = false;
        this.products = Array.from(products);
        this.productsCopy = Array.from(products);
      });
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
    // When dialog closed check if data was sent. If data was sent product a was added.
    // Product is added in the AddProductDialogComponent
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Add product to UI
        this.products.push(result.product);
        // Add product to copy array
        this.productsCopy.push(result.product);
        // Update UI warning counts and discrepancy by updating cart
        this.cartChange.emit(result.cart);

        // Notify user
        this.snackBar.open('Product added to cart.', undefined, {
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

    /* When removing prodcuts from a cart pass the cart to update cart information.
     Pass list of products to display in dialog */
    dialogConfig.data = {
      cart: this.cart,
      // Pass all products using productsCopy
      products: this.productsCopy,
    };

    const dialogRef = this.dialog.open(
      RemoveProductsDialogComponent,
      dialogConfig
    );
    // When dialog closes if data is return products were deleted.
    // Check results. Results is an object {result.deletedIds, result.cart}
    // deletedIds is an array of the ids of deleted products and cart the updated cart
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Remove products from productsCopy
        this.productsCopy = this.productsCopy.filter(
          (product) => !result.deletedIds.includes(product.productId)
        );
        // Remove products from UI
        this.products = this.products.filter(
          (product) => !result.deletedIds.includes(product.productId)
        );
        // Update cart values in UI
        this.cartChange.emit(result.cart);

        // Notify User
        this.snackBar.open('Products removed from cart', undefined, {
          duration: 2000,
        });
      }
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
