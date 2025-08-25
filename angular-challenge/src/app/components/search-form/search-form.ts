import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCard,
  ],
  templateUrl: './search-form.html',
  styleUrls: ['./search-form.scss'],
})
export class SearchFormComponent {
  @Output() searchEvent = new EventEmitter<{ values: string[]; type: 'aircraft' | 'callsign' }>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchValues: [''],
      searchType: ['aircraft'],
    });
  }

  onSearch() {
    const values = this.searchForm.value.searchValues
      ?.split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v);
    const type = this.searchForm.value.searchType;
    if (values?.length) {
      this.searchEvent.emit({ values, type });
    }
  }
}
