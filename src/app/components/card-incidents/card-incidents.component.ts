import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from 'src/app/pages/incident/incidents.service';
import { Incident } from 'src/app/pages/incident/incident';

@Component({
  selector: 'app-card-incidents',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="col-xxl-4 col-md-6 px-1">
  <div class="card info-card sales-card grey-card rounded-lg">
    <div class="card-body attractive-card">
      <h5 class="card-title"><h2><b>Incidents signalés dans le mois</b></h2></h5>
      <div class="d-flex align-items-center">
        <div class="multi-user-icon rounded-circle d-flex align-items-center justify-content-center">
          <i class="bi bi-file-earmark-bar-graph"></i> <!-- Icône d'incident -->
        </div>
        <div class="ps-3">
          <h6>{{ incidentsCountThisMonth }}</h6>
        </div>
      </div>
    </div>
  </div>
</div>

  `,
  styles: [`
  .multi-user-icon {
  background-color: #000; /* Couleur de fond noire */
  color: #fff; /* Couleur de l'icône blanche */
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.grey-card {
  background-color: #ccc; /* Couleur de fond grise */
  border: none; /* Supprime la bordure */
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

  
  `
  ]
})
export class CardIncidentsComponent implements OnInit{
  incidentsCountThisMonth: number = 0;

  constructor(private incidentsService: IncidentsService) {}

  ngOnInit(): void {
    this.getIncidentsCountThisMonth();
  }

  getIncidentsCountThisMonth() {
    this.incidentsService.getIncidents().subscribe((incidents: Incident[]) => {
      const currentDate = new Date();
      this.incidentsCountThisMonth = incidents.filter(incident => {
        const incidentDate = new Date(incident.dateCreationIncident);
        return incidentDate.getMonth() === currentDate.getMonth() && incidentDate.getFullYear() === currentDate.getFullYear();
      }).length;
    });
  }


}
