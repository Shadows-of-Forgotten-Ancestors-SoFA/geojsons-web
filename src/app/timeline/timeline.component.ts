import { Component } from '@angular/core';
import { TimelineService } from './timeline.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'], 
})
export class TimelineComponent {
  defaultYear: number = 2024; // Default year
  defaultMonth: number = 10;    // Default month

  constructor(private timelineService: TimelineService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const year = form.value.year;
      const month = form.value.month;
      
      // Store the values in the service
      this.timelineService.setValues(year, month);
    }
  }
}
