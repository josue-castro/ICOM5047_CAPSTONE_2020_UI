import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  @Output() search: EventEmitter<any> = new EventEmitter();

  searchForm = this.fb.group({
    term: [''],
    searchBy: ['lotId'],
    filterBy: [''],
  });

  searchOptions = [
    { value: 'lotId', viewValue: 'Lot ID' },
    { value: 'productName', viewValue: 'Product Name' },
  ];
  filterOptions = [
    { value: 'expiredProd', viewValue: 'Expired Products' },
    { value: 'nearExpProd', viewValue: 'Products Near Expiration' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (changes['disabled'].currentValue) {
        this.searchForm.disable();
      } else {
        this.searchForm.enable();
      }
    }
  }

  onSearch() {
    this.search.emit(this.searchForm.value);
  }
}
