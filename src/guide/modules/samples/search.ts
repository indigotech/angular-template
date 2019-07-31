import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { InputErasableDirective } from 'widgets';

@Component({
  selector: 'tq-search',
  template: require('./search.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchSample implements OnInit {
  searchForm: FormGroup;

  private mockRecommendationList: string[] = [
    'Mesa', 'Mesa de centro', 'Mesa de jantar', 'Mesa para 8 lugares',
  ];
  private autocompleteIsActive: boolean = false;
  private recommendationList: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchField: ['', Validators.required],
    });
  }

  shouldShowAutocomplete(): boolean {
    return this.autocompleteIsActive && (this.recommendationList.length > 0);
  }

  onKeyUp(ev: KeyboardEvent): void {
    this.search(this.searchForm.controls['searchField'].value);
  }
  onFocus(ev: FocusEvent): void {
    if (this.searchForm.controls['searchField'].value !== '') {
      this.autocompleteIsActive = true;
    }
  }
  onBlur(ev: FocusEvent): void {
    this.autocompleteIsActive = false;
  }

  onSubmit(value: string): void {
    console.warn('You submitted value: ', value);
  }

  search(term: string): void {
    if (term !== '') {
      this.autocompleteIsActive = true;
      this.recommendationList = this.mockRecommendationList;
    } else {
      this.autocompleteIsActive = false;
      this.recommendationList = [];
    }
  }

}
