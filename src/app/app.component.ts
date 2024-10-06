import { Component } from '@angular/core';

import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { HttpClientModule } from '@angular/common/http';
import { TimelineComponent } from './timeline/timeline.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MapComponent,
    HttpClientModule,
    TimelineComponent,
    FormsModule
  ],
  providers: [MapService],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}
}
