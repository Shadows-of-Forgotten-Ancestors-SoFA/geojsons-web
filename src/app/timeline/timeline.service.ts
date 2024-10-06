// src/app/services/timeline.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  private year: number | null = 2024;
  private month: number | null = 8;
  private yearmonthSubject = new Subject<void>(); // Subject to notify subscribers

  setValues(year: number, month: number): void {
    this.year = year;
    this.month = month;
    this.yearmonthSubject.next(); // Emit an event when values are set
  }

  getYearMonthString(): string | null {
    if (this.year !== null && this.month !== null) {
      return `${this.year}${this.month.toString().padStart(2, '0')}`;
    }
    return null;
  }

  // Method to get observable for year/month changes
  getYearMonthUpdates() {
    return this.yearmonthSubject.asObservable();
  }
}
