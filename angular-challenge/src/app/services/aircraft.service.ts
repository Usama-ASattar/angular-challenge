import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AircraftService {
  private apiUrl = 'https://api.adsbdb.com/v0';

  constructor(private http: HttpClient) {}

  // Accepts registration number
  getAircraftData(registration: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/aircraft/${registration}`);
  }

  // Accepts callsign
  getFlightRouteData(callsign: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/callsign/${callsign}`);
  }
}
