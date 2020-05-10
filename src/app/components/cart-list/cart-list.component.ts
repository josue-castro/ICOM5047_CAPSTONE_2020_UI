import { Component, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  carts: Cart[];
  searchOptions = [
    { value: 'cartId', viewValue: 'Cart ID' },
    { value: 'lotId', viewValue: 'Lot ID' },
    { value: 'productName', viewValue: 'Product Name' },
    { value: 'expDate', viewValue: 'Expiration Date' },
  ];
  filterOptions = [
    { value: 'expired', viewValue: 'Expired Products' },
    { value: 'nearExp', viewValue: 'Products Near Expiration' },
  ];

  @Output() selectedCart: Cart;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
    });
  }

  cartSelect(cart: Cart): void {
    // Issue: Repetitively fetching products even when selectedCart was equal to cart.
    // Resolved: Only fetch if the selected cart is different to the previous cart
    if (!this.selectedCart || this.selectedCart !== cart) {
      this.selectedCart = cart;
    }
  }

  searchCart(term: string, searchBy: String, filterBy: String) {
    console.log(term, searchBy, filterBy);
  }
}
