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
    this.isLoading = true;
    this.cartService.getCarts().subscribe((carts) => {
      this.isLoading = false;
      this.carts = carts;
      this.filteredCarts = this.carts;
    });
  }

  selectCart(cart: Cart): void {
    this.selectedCart = cart;
    this.showDetails = true;
  }

  filterCarts(searchForm): void {
    const { contains } = searchForm;
    if (contains) {
      switch (contains) {
        case 'expiredProd':
          this.filteredCarts = this.carts.filter(
            (cart) => cart.expiredWarningCount > 0
          );
          break;

        case 'nearExpProd':
          this.filteredCarts = this.carts.filter(
            (cart) => cart.nearExpirationDateWarningCount > 0
          );
          break;
      }
    } else {
      this.filteredCarts = this.carts;
    }
  }

  searchCart(searchForm): void {
    const { term, searchBy } = searchForm;
    this.isLoading = true;
    this.selectedCart = null;
    this.showDetails = false;
    this.cartService.searchCarts(term, searchBy).subscribe((carts) => {
      this.isLoading = false;
      this.carts = carts as Cart[];
      this.filterCarts(searchForm);
    });
  }
}
