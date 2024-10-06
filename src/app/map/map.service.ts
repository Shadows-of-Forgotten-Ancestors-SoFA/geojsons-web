import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimelineService } from '../timeline/timeline.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private apiUrl = 'http://localhost:8080/geojsons/'; // Your API URL

  constructor(private http: HttpClient, private timelineService: TimelineService) {}

  // Method to get GeoJSON from API
  getGeoJSON(): Observable<any> {
    console.log('map service: '+ this.timelineService.getYearMonthString());
    return this.http.get<any>(this.apiUrl + this.timelineService.getYearMonthString());
  }
}
