// src/app/components/map/map.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';
import { Subscription } from 'rxjs';
import { TimelineService } from '../timeline/timeline.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
})
export class MapComponent implements OnInit, OnDestroy {
  private map: any;
  private geoJsonLayer: L.GeoJSON | undefined;
  private yearMonthSubscription: Subscription;

  constructor(private mapService: MapService, private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.initMap();
    // Subscribe to updates from TimelineService
    this.yearMonthSubscription = this.timelineService.getYearMonthUpdates().subscribe(() => {
      this.reloadGeoJSON();
    });
  }

  private initMap(): void {
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    this.map = L.map('map', {
      center: [45.0, 22.5],
      zoom: 7,
      layers: [osm],
    });

    // Initial load of GeoJSON data
    this.loadGeoJSON();
  }

  private loadGeoJSON(): void {
    this.mapService.getGeoJSON().subscribe((geoJsonData) => {
      this.geoJsonLayer = L.geoJSON(geoJsonData, {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: this.getColorByDensity(feature.properties.density),
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          });
        },
        onEachFeature: (feature, layer) => {
          const popupContent = `
            <strong>Date:</strong> ${new Date(feature.properties.datestamp * 1000).toLocaleDateString()}<br>
            <strong>Density:</strong> ${feature.properties.density}<br>
            <strong>Top:</strong> ${feature.properties.top}<br>
            <strong>Bottom:</strong> ${feature.properties.bottom}<br>
            <strong>Left:</strong> ${feature.properties.left}<br>
            <strong>Right:</strong> ${feature.properties.right}<br>
          `;
          layer.bindPopup(popupContent);
        },
      }).addTo(this.map);
    });
  }

  private reloadGeoJSON(): void {
    if (this.geoJsonLayer) {
      this.map.removeLayer(this.geoJsonLayer); // Remove existing layer
    }
    this.loadGeoJSON(); // Load new GeoJSON data
  }

  private getColorByDensity(density: number): string {
    if (density < 0.00009) return '#00ff00';
    if (density < 0.0003) return '#ffcc00';
    return '#ff0000';
  }

  ngOnDestroy(): void {
    this.yearMonthSubscription.unsubscribe(); // Clean up subscription
  }
}
