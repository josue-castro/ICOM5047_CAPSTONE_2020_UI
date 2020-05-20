import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Site } from 'src/app/data/models/Site';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cart-search',
  templateUrl: './cart-search.component.html',
  styleUrls: ['./cart-search.component.css'],
})
export class CartSearchComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() formChange: EventEmitter<any> = new EventEmitter();

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

  ngOnInit(): void {
    this.onFormChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (changes['disabled'].currentValue) {
        this.searchForm.disable();
      } else {
        this.searchForm.enable();
      }
    }
  }

  onFormChange(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => this.formChange.emit(this.searchForm.value));
  }

  onSearch(): void {
    this.search.emit(this.searchForm.value);
  }

  resetForm(): void {
    this.searchForm.reset();
    this.searchForm.get('locType').setValue('physical');
    this.searchForm.get('searchBy').setValue('cartId');
  }
}
