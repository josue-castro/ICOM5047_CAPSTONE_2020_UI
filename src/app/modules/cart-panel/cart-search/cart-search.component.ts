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
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Site service and model
import { Site } from 'src/app/data/models/Site';
import { SiteService } from 'src/app/data/services/site.service';

/*
Cart Search component is the search bar placed  in the cart list component
it as the advanced search form that sends to the cart list component the
parameters to be able to filter and search the cart list
*/

@Component({
  selector: 'cart-search',
  templateUrl: './cart-search.component.html',
  styleUrls: ['./cart-search.component.css'],
})
export class CartSearchComponent implements OnInit, OnChanges {
  // The search component usage
  @Input() disabled: boolean = false;
  // Emit search event to send search form
  @Output() search: EventEmitter<any> = new EventEmitter();
  // Emit event to watch changes in the form
  @Output() formChange: EventEmitter<any> = new EventEmitter();

  // Parameters for search form
  searchForm = this.fb.group({
    term: [''],
    searchBy: ['cartName'],
    contains: [''],
    locType: ['physical'],
    site: [''],
  });

  // Search options that are passed to the search by category
  searchOptions = [
    { value: 'cartName', viewValue: 'Cart' },
    { value: 'lotId', viewValue: 'Lot ID' },
    { value: 'productName', viewValue: 'Product Name' },
    { value: 'expDate', viewValue: 'Expiration Date' },
  ];
  // Options to filter carts based on what they contain
  containsOptions = [
    { value: 'expired', viewValue: 'Expired Products' },
    { value: 'nearExpDate', viewValue: 'Products Near Expiration' },
  ];
  // Options for locations
  sites: Site[];

  constructor(private fb: FormBuilder, private siteService: SiteService) {}

  ngOnInit(): void {
    this.onFormChange();
    // Load site options from the backend
    this.siteService.getSites().subscribe((sites) => (this.sites = sites));
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
    this.searchForm.get('searchBy').setValue('cartName');
  }
}
