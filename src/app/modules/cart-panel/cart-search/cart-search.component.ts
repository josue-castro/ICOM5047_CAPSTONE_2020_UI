import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Site } from 'src/app/data/models/Site';

@Component({
  selector: 'cart-search',
  templateUrl: './cart-search.component.html',
  styleUrls: ['./cart-search.component.css'],
})
export class CartSearchComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter();

  searchForm = this.fb.group({
    term: [''],
    searchBy: ['cartId'],
    contains: [''],
    locType: ['physical'],
    site: [''],
  });

  searchOptions = [
    { value: 'cartId', viewValue: 'Cart ID' },
    { value: 'lotId', viewValue: 'Lot ID' },
    { value: 'productName', viewValue: 'Product Name' },
    { value: 'expDate', viewValue: 'Expiration Date' },
  ];
  containsOptions = [
    { value: 'expiredProd', viewValue: 'Expired Products' },
    { value: 'nearExpProd', viewValue: 'Products Near Expiration' },
  ];
  sites: Site[] = [
    { id: 1, siteName: 'Room A' },
    { id: 2, siteName: 'Room B' },
    { id: 3, siteName: 'Room C' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSearch() {
    this.search.emit(this.searchForm.value);
  }
}
