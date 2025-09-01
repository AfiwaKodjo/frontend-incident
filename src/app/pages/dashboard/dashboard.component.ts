import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from "../../components/card-details/card-details.component";
import { Chart, registerables } from 'chart.js';
import { CardIncidentsComponent } from "../../components/card-incidents/card-incidents.component";
import { CardMaterielsComponent } from "../../components/card-materiels/card-materiels.component";
import { IncidentsService } from '../incident/incidents.service';
import { Incident } from '../incident/incident';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styles: [],
    imports: [CommonModule, CardDetailsComponent, CardIncidentsComponent, CardMaterielsComponent]
})
export class DashboardComponent implements OnInit{
      incidentData: Incident[] = [];
      
        chart: any; // Déclarez le type correct du graphique

        constructor(private incidentsService: IncidentsService){
            Chart.register(...registerables);
        }
        ngOnInit(): void {
          this.incidentsService.getIncidents().subscribe(data => {
            this.incidentData = data;
            this.createChart();
          });
        }

        createChart() {
          const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
          ];
      
          const data = new Array(12).fill(0); // Initialisation du tableau de données
      
          this.incidentData.forEach(incident => {
            if (incident.dateClotureIncident) {
              const monthIndex = new Date(incident.dateClotureIncident).getMonth();
              data[monthIndex]++;
            }
          });
      
          const ctx = document.getElementById('incidentChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: months,
              datasets: [{
                label: 'Incidents clôturés par mois',
                data: data,
                backgroundColor: '#1E90FF',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1 // Espacement entre les étiquettes de l'axe y
                  }
                }
              }
            }
          });
          
        }
      }
      
