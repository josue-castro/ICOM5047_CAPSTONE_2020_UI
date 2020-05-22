import { Component, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  isLoading: boolean;
  carts: Cart[];
  filteredCarts: Cart[];
  selectedCart: Cart;
  showDetails: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Load all carts when components starts
    this.isLoading = true;
    this.cartService.getCarts().subscribe((carts) => {
      this.isLoading = false;
      this.carts = carts;
    });
  }

  selectCart(cart: Cart): void {
    this.selectedCart = cart;
    this.showDetails = true;
  }

  searchCart(searchForm): void {
    const { term, searchBy, contains, site } = searchForm;
    this.isLoading = true;
    this.selectedCart = null;
    this.showDetails = false;
    this.cartService.searchCarts(term, searchBy).subscribe((carts) => {
      /* If carts is of type Cart we get a single object. We need an array to
      assign it to this.carts
      */
      if (carts) {
        // carts is defined but it can be of type Cart or Cart[]
        if (!Array.isArray(carts)) {
          // If carts is of type Cart we make a temporary array so we can assign it later to this.carts
          let temp: Cart[] = [];
          temp.push(carts);
          this.carts = this.filterCarts(temp, contains, site);
        } else {
          // carts is of type Cart[], we can filter the array
          this.carts = this.filterCarts(carts, contains, site);
        }
      } else {
        // carts is undefined
        this.carts = [];
      }
      this.isLoading = false;
    });
  }

  filterCarts(carts: Cart[], contains: string, site: string): Cart[] {
    let result: Cart[] = carts;
    /* Contains is either nearExpirationDateWarningCount or expiredWarningCount
      both properties of the Cart model with a value of type number. Filter
      carts that contain products that expire or are soon to expire.
    */
    switch (contains) {
      case 'expired':
        result = result.filter((cart) => cart.expiredWarningCount > 0);
        break;

      case 'nearExpDate':
        result = result.filter(
          (cart) => cart.nearExpirationDateWarningCount > 0
        );
        break;
    }
    if (site) {
      result = result.filter((cart) => cart.siteName == site);
    }
    return result;
  }
}
