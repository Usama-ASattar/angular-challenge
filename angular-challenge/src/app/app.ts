import { Component } from '@angular/core';
import { SearchFormComponent } from './components/search-form/search-form';
import { ResultsDisplayComponent } from './components/results-display/results-display';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchFormComponent, ResultsDisplayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  currentSearchValues: string[] = [];
  currentSearchType: 'aircraft' | 'callsign' = 'aircraft';

  onSearch(event: { values: string[]; type: 'aircraft' | 'callsign' }) {
    this.currentSearchValues = event.values;
    this.currentSearchType = event.type;
  }
}
