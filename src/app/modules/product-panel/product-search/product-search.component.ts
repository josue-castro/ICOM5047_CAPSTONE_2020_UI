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
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  // Upon key.enter or search icon click emit search event
  @Output() search: EventEmitter<any> = new EventEmitter();

  // Emit when values in form change. Can be use to perform a dynamic search
  @Output() formChange: EventEmitter<any> = new EventEmitter();

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
    { value: 'expired', viewValue: 'Expired Products' },
    { value: 'nearExp', viewValue: 'Products Near Expiration' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formOnChange();
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

  // Emit form values upon changes for dynamic in search in
  // product-list using searchProducts
  formOnChange(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => this.formChange.emit(val));
  }

  onSearch(): void {
    this.search.emit(this.searchForm.value);
  }

  resetForm(): void {
    this.searchForm.get('term').reset();
    this.searchForm.get('filterBy').reset();
    this.searchForm.get('searchBy').setValue('lotId');
  }
}
