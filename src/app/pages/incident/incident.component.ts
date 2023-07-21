import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from './incidents.service';
import { Incident } from './incident';

@Component({
  selector: 'app-incident',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit{
  public incidents: Incident[] = [];

  constructor(private incidentsService: IncidentsService) { }



  ngOnInit(): void {
    this.getIncidents();
  }

  private getIncidents() {
    this.incidentsService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }

}
