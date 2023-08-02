import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { IncidentsService } from './incidents.service';
import { Incident } from './incident';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Procedure } from '../procedures/procedure';
import { Agence } from '../agences/agence';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../clients/client';
import { Utilisateurs } from '../utilisateurs/update-utilisateurs/utilisateurs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-incident',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,  HttpClientModule,],
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
  providers: [IncidentsService]
})
export class IncidentComponent implements OnInit{
  form: any = {};

  incidents: Incident[] = [];

  idIncident!: number;

  idAgence!: number;
  idClient!: number;
  idProcedure!: number;
  incident: Incident = new Incident();

  agences: Agence[] = [];

  procedures: Procedure[] = [];

  clients: Client[] = [];

  utilisateurs: Utilisateurs[] = [];

  public deleteIncident!: Incident;

  constructor(private incidentsService: IncidentsService, private router: Router) { }

  ngOnInit(): void {
    this.getIncidents();
    this.incidentsService.getAgences().subscribe(response => this.agences = response);
    this.incidentsService.getProcedures().subscribe(response => this.procedures = response);
    this.incidentsService.getClients().subscribe(response => this.clients = response);
    this.incidentsService.getUtilisateurs().subscribe(response => this.utilisateurs = response);


  }

  private getIncidents() {
    this.incidentsService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }

  onSubmit(){ 
    let incidentModel: any = {idIncident: this.incident.idIncident, nomIncident: this.incident.nomIncident,
       descriptionIncident: this.incident.descriptionIncident, dateCreationIncident: this.incident.dateCreationIncident,
       dateClotureIncident: this.incident.dateClotureIncident,prioriteIncident: this.incident.prioriteIncident, statutIncident: this.incident.statutIncident, canalIncident: this.incident.canalIncident,
       agence: {idAgence: this.incident.agence.idAgence, lieuAgence: this.incident.agence.lieuAgence, telephoneAgence: this.incident.agence.telephoneAgence, client:{idClient: this.incident.agence.client.idClient, nomClient: this.incident.agence.client.nomClient, adresseClient: this.incident.agence.client.adresseClient, contactClient: this.incident.agence.client.contactClient, emailClient: this.incident.agence.client.emailClient,
       utilisateur: {id: this.incident.agence.client.utilisateur.id, nom: this.incident.agence.client.utilisateur.nom, prenom: this.incident.agence.client.utilisateur.prenom, mot_de_passe: this.incident.agence.client.utilisateur.mot_de_passe, email: this.incident.agence.client.utilisateur.email, role: this.incident.agence.client.utilisateur.role}}},
       procedure: {idProcedure: this.incident.procedure.idProcedure, nomProcedure: this.incident.procedure.nomProcedure, libelleProcedure: this.incident.procedure.libelleProcedure, utilisateur: {id: this.incident.procedure.utilisateur.id, nom: this.incident.procedure.utilisateur.nom, prenom: this.incident.procedure.utilisateur.prenom, mot_de_passe: this.incident.procedure.utilisateur.mot_de_passe, email: this.incident.procedure.utilisateur.email, role: this.incident.agence.client.utilisateur.role}},
      }
    //console.log(incidentModel)
    //console.log(this.incident.dateClotureIncident)
   this.incidentsService.createIncident(incidentModel).subscribe(data =>{
      console.log(data);
      this.getIncidents();
    },
    _error => alert('L\'incident a été ajouté !!')
    )

    }


  incidentDetails(idIncident: number){
      this.router.navigate(['admin/incident-details', idIncident]);
    }

    public onDeleteIncident(idIncident: number): void{
      this.incidentsService.deleteIncident(idIncident).subscribe(
        (response: void) => {
          console.log(response);
          this.getIncidents();
        },
        (error: HttpErrorResponse) =>{
          if (error.status === 500) {
           alert("Suppression non autorisée. Revoyez le mouvement !! ");
        } else if (error.status === 200) {
          alert("L'incident a été bien supprimé !!");
        } else
        {
          alert ("Erreur !!");
        }
      }
        );
      
    }


    public onOpenModal(incident: Incident, mode: string): void{
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode ==='delete'){
        this.deleteIncident = incident;
          button.setAttribute('data-target', '#deleteIncidentModal');
      }
      container!.appendChild(button);
      button.click();
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

updateIncident(idIncident: number){
  this.router.navigate(['admin/update-incidents/idIncident', idIncident]);
    }    

}
