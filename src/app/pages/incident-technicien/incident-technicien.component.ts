import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../incident/incidents.service';
import { Incident } from '../incident/incident';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-technicien',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [IncidentsService],
  template: `
  <section class="section dashboard">
  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-12">
      <div class="row">
        <div class="pagetitle">
          <h1>Incident</h1>
          <br>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
              <li class="breadcrumb-item active">Incident</li>
            </ol>
          </nav>
        </div>
      </div>          
    </div>
  </div>
</section>
     <div class="row">
        <div class="col-12 col-lg-3 mb-3 ms-auto">
            <hr class="my-1">      
            <div class="text-center px-xl-3">
                <div><input type="search" (ngModelChange)="searchIncidents(key.value )" #key="ngModel" ngModel
                 class="form-control w-100" id="searchNom " placeholder="RECHERCHE..." name="key"  required></div>
              </div>         
            </div>
        </div>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<div class="container mt-3">
    <h2>Liste des incidents</h2>          
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <!--th>Description</th-->
          <!--th>Canal incident</th-->
          <th>Priorité</th>
          <th>Client</th>
          <th>Agence</th>
          <th>téléphone</th>
          <th>Statut de l'incident</th>
          <!--th>procédure</th-->
          <!--th>Description procédure</th-->
          <th>Date création</th>
          <th>Date clôture</th>
          <th>Technicien</th>
          <th>Votre action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let incident of incidents">
          <td>{{incident.nomIncident}}</td>
          <!--td>{{incident.descriptionIncident}}</td-->
          <!--td>{{incident.canalIncident}}</td-->
          <td style="color: green;"><b>{{incident.prioriteIncident}}</b></td>
          <td>{{incident.agence.client.nomClient}}</td>
          <td>{{incident.agence.lieuAgence}}</td>
          <td>{{incident.agence.telephoneAgence}}</td>
          <td style="color: black;"><b>{{incident.statutIncident}}</b></td>
          <!--td>{{incident.procedure.nomProcedure}}</td-->
          <!--td>{{incident.procedure.libelleProcedure}}</td-->
          <td>{{incident.dateCreationIncident}}</td>
          <td>{{incident.dateClotureIncident}}</td>
          <td><b>{{incident.agence.client.utilisateur.nom}}</b></td>
          <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle" (click)="updateIncident(incident.idIncident)"><i class="fa fa-edit" style="color:royalblue;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="incidentDetails(incident.idIncident)"><i class="fa fa-plus" style="color: green;"></i> </button>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  `,
  styles: [
    `
     body{
    background: #edf1f5;
    margin-top:20px;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: 0;
}
.btn-circle.btn-lg, .btn-group-lg>.btn-circle.btn {
    width: 50px;
    height: 50px;
    padding: 14px 15px;
    font-size: 18px;
    line-height: 23px;
}
.text-muted {
    color: #8898aa!important;
}
[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
}
.btn-circle {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    padding: 10px;
}
.user-table tbody tr .category-select {
    max-width: 150px;
    border-radius: 20px;
}
    
    `
  ]
})
export class IncidentTechnicienComponent implements OnInit{

  public incidents: Incident[] = [];
  idIncident!: number;

  constructor(private incidentsService: IncidentsService, private router: Router) { }

  ngOnInit(): void {
    this.getIncidents();
  }

  private getIncidents() {
    this.incidentsService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }
  updateIncident(idIncident: number){
    this.router.navigate(['/technicien/update-incidentTechnicien/idIncident', idIncident]);
      }    
  
      public searchIncidents(key: string): void{
        console.log(key);
          const results: Incident[] = [];
          for (const incident of this.incidents){
            if(incident.nomIncident.toLowerCase().indexOf(key.toLowerCase()) !== -1 
            || incident.agence.client.nomClient.toLowerCase().indexOf(key.toLowerCase()) !== -1
            || incident.agence.lieuAgence.toLowerCase().indexOf(key.toLowerCase()) !== -1
            || incident.agence.client.utilisateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1){
              results.push(incident);
            }
          } 
        this.incidents = results;
          if(results.length === 0 || !key){
            this.getIncidents();
          }
      
      }


      incidentDetails(idIncident: number){
        this.router.navigate(['technicien/incident-details', idIncident]);
      }
}
