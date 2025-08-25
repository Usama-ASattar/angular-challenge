import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftService } from '../../services/aircraft.service';
import { forkJoin, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-results-display',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardTitle, MatDivider],
  templateUrl: './results-display.html',
  styleUrls: ['./results-display.scss'],
})
export class ResultsDisplayComponent {
  results: any[] = [];
  isLoading = false;

  private _searchValues: string[] = [];
  _searchType: 'aircraft' | 'callsign' = 'aircraft';

  constructor(private aircraftService: AircraftService) {}

  @Input() set searchValues(values: string[]) {
    this._searchValues = values;
    if (values?.length) this.fetchResults();
  }

  @Input() set searchType(type: 'aircraft' | 'callsign') {
    this._searchType = type;
    if (this._searchValues?.length) this.fetchResults();
  }

  private fetchResults() {
    this.isLoading = true;

    const requests = this._searchValues.map((value) => {
      const apiCall =
        this._searchType === 'aircraft'
          ? this.aircraftService.getAircraftData(value)
          : this.aircraftService.getFlightRouteData(value);

      return apiCall.pipe(catchError(() => of({ error: `No data for ${value}` })));
    });

    forkJoin(requests).subscribe((res) => {
      this.results = res;
      this.isLoading = false;
      console.log('API responses:', res);
    });
  }

  hasData(item: any): boolean {
    if (!item) return false;
    if (this._searchType === 'aircraft') return !!item.response?.aircraft;
    if (this._searchType === 'callsign') return !!item.response?.flightroute;
    return false;
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }
}
