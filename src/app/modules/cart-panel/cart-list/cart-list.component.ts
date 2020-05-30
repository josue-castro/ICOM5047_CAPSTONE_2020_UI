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
  selectedCart: Cart;
  showDetails: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Load all carts when components starts
    this.isLoading = true;
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
      this.isLoading = false;
    });
    // Watch for incoming carts and actions to update the UI
    // Carts and action come from cart-register, delete-cart components
    this.cartService.getCartAction().subscribe((data) => {
      switch (data.action) {
        case 'register':
          this.carts.push(data.cart);
          break;

        case 'update':
          break;

        case 'delete':
          this.carts = this.carts.filter((c) => c.cartId != data.cart.cartId);
          break;
      }
    });
  }

  selectCart(cart: Cart): void {
    this.selectedCart = cart;
    this.showDetails = true;
  }

  searchCart(searchForm): void {
    // Parameters send in searchForm event. searchForm event is declared in the cart-search component
    const { term, searchBy, contains, site } = searchForm;
    // when searching reset the cart selected and hide details and cart list
    this.isLoading = true;
    this.selectedCart = null;
    this.showDetails = false;
    // fetch carts using search criteria
    // search is split between using the cartService.searchCarts and this.filterCarts()
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

  /** Filter the cart list based on the parameters specified.
   * Returns the filtered cart array
   * @param carts The cart array to filter
   * @param contains 'expired' to filter by carts containing expired products. 'nearExpDate' to filter by carts containing products near expiration
   * @param site Location name to filter carts in that location.
   */
  private filterCarts(carts: Cart[], contains?: string, site?: string): Cart[] {
    let result: Cart[] = carts;
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
