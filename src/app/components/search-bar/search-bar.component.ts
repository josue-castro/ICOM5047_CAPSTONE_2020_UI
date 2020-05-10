import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface SelectOption {
  value: string;
  viewValue: string;
}

interface SearchForm {
  value: string;
  searchBy: string;
  filterBy: string;
}

@Component({
  selector: 'app-search-bar[searchOptions]',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  // Search input label
  @Input() inputLabel: string = 'Search';
  // Search input label
  @Input() searchLabel: string = 'Search by';
  // Search input label
  @Input() filterLabel: string = 'Filter by';
  // Disable input
  @Input() disabled: boolean = false;
  // Options to be passed to the Search by select group
  @Input() searchOptions: SelectOption[];
  // Options to be passed to the Filter by select group
  @Input() filterOptions: SelectOption[];
  @Output() search: EventEmitter<SearchForm> = new EventEmitter();

  value;
  searchBy;
  filterBy;

  constructor() {}

  ngOnInit(): void {
    this.searchBy = this.searchOptions[0].value;
  }

  onSearch() {
    this.search.emit();
  }
}
