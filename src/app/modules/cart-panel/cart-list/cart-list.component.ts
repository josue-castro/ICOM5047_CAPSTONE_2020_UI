import { Component, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/data/models/Cart';
import { CartService } from 'src/app/data/services/cart.service';

@Component({
  selector: 'cart-list',
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

  selectedCart: Cart;

  showCartDetails: boolean = false;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((carts) => {
      this.carts = carts;
    });
  }

  onSelect(cart: Cart): void {
    this.selectedCart = cart;
  }

  searchCart(term: string, searchBy: String, filterBy: String) {
    console.log(term, searchBy, filterBy);
  }
}
