import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
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
import { ProductService } from '../../../data/services/product.service';

@Component({
  selector: 'product-list[cart]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() cart: Cart;

  isLoading: boolean;
  products: Product[];
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
      // If cart value changed and is not null, load products in the cart
      if (!change.firstChange && change.currentValue) {
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
      cartId: this.cart.cartId,
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
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
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
      cartId: this.cart.cartId,
      products: this.products.map((product) => ({
        id: product.productId,
        lotId: product.lotId,
      })),
    };

    const dialogRef = this.dialog.open(
      RemoveProductsDialogComponent,
      dialogConfig
    );
    /* When dialog closed verify if data was sent. If data was sent it return an array containing
    ths productId's that will be remove  */
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // for each product selected delete it from the backend.
        data.forEach((id) => {
          this.productService.deleteProduct(id).subscribe((_) => {
            // Close details and null selected product if product was deleted
            if (this.selectedProduct && this.selectedProduct.productId == id) {
              this.selectedProduct = null;
              this.showDetails = false;
            }
            // On success remove product the UI
            this.products = this.products.filter(
              (product) => product.productId != id
            );
          });
        });
        this._snackBar.open('Products removed from cart', undefined, {
          duration: 2000,
        });
      }
    });
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe((product) => {
      // TODO add product to products array
      if (product) {
        this.products.push(product);
        this._snackBar.open('Product added to cart.', undefined, {
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
