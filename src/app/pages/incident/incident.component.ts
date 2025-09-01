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
import { MesPriorites } from './mes-priorites';
import { MesStatuts } from './mes-statuts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';






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

  currentDate = new Date();

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
    let incidentModel: any = {nomIncident: this.incident.nomIncident,
       descriptionIncident: this.incident.descriptionIncident, dateCreationIncident: this.incident.dateCreationIncident,
       dateClotureIncident: this.incident.dateClotureIncident,prioriteIncident: this.incident.prioriteIncident, statutIncident: this.incident.statutIncident,
        canalIncident: this.incident.canalIncident,
       agence: {idAgence: this.incident.agence.idAgence, lieuAgence: this.incident.agence.lieuAgence, telephoneAgence: this.incident.agence.telephoneAgence,
       client:{idClient: this.incident.agence.client.idClient, nomClient: this.incident.agence.client.nomClient, adresseClient: this.incident.agence.client.adresseClient,
      contactClient: this.incident.agence.client.contactClient, emailClient: this.incident.agence.client.emailClient,
       utilisateur: {id: this.incident.agence.client.utilisateur.id, nom: this.incident.agence.client.utilisateur.nom, 
        prenom: this.incident.agence.client.utilisateur.prenom,
        mot_de_passe: this.incident.agence.client.utilisateur.mot_de_passe, email: this.incident.agence.client.utilisateur.email,
         role: this.incident.agence.client.utilisateur.role}}},
       procedure: {idProcedure: this.incident.procedure.idProcedure, nomProcedure: this.incident.procedure.nomProcedure,
         libelleProcedure: this.incident.procedure.libelleProcedure},
      }
   this.incidentsService.createIncident(incidentModel).subscribe(data =>{
      console.log(data);
      this.getIncidents();
    },
    (error: HttpErrorResponse) => {
      if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur du serveur!! '
        });
        this.getIncidents();
      } else  if (error.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'incident a été ajouté et envoyé avec succès!!'
        });
        this.getIncidents();
      }else 
      {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur !!'
        });
        this.getIncidents();
      }
    }
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
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Suppression non autorisée. Revoyez le mouvement !! '
          });
          this.getIncidents();
        } else  if (error.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'L\'incident a été bien supprimé !!'
          });
          this.getIncidents();
        }else 
        {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur !!'
          });
          this.getIncidents();
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

   public searchIncidents(key: string): void {
      console.log(key);
      const results: Incident[] = [];
      const lowercaseKey = key.toLowerCase(); // Convertir la clé en minuscules
      
      for (const incident of this.incidents) {
          if (
              incident.nomIncident.toLowerCase().includes(lowercaseKey) ||
              incident.dateCreationIncident?.toString().toLowerCase().includes(lowercaseKey) ||
              incident.dateClotureIncident?.toString().toLowerCase().includes(lowercaseKey) ||
              incident.prioriteIncident.toString().toLowerCase().includes(lowercaseKey) ||
              incident.canalIncident.toString().toLowerCase().includes(lowercaseKey) ||
              incident.statutIncident.toString().toLowerCase().includes(lowercaseKey) ||
              incident.agence.client.nomClient.toLowerCase().includes(lowercaseKey) ||
              incident.agence.lieuAgence.toLowerCase().includes(lowercaseKey) ||
              incident.agence.telephoneAgence.toLowerCase().includes(lowercaseKey) ||
              incident.agence.client.utilisateur.nom.toLowerCase().includes(lowercaseKey)
          ) {
              results.push(incident);
          }
      } 
      
      this.incidents = results;
      
      if (results.length === 0 || !key) {
          this.getIncidents();
      }
  }
  


updateIncident(idIncident: number){
  this.router.navigate(['admin/update-incidents/idIncident', idIncident]);
    }    

    assignPriority(idIncident: number): void {
      this.incidentsService.assignPriorityToIncident(idIncident).subscribe(
        () => {
          alert('Incident envoyé avec succès !');
          this.getIncidents(); // Rafraîchir la liste des incidents
        },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur du serveur !! '
          });
          this.getIncidents();
        } else  if (error.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Incident envoyé avec succès !'
          });
          this.getIncidents();
        }else 
        {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur !!'
          });
          this.getIncidents();
        }
      }
      );
    }

 // Formater la date actuelle au format attendu par datetime-local
 formattedCurrentDate = this.formatDate(this.currentDate);

 // Calculer la date maximale (date et heure actuelles)
 maxDate = this.formatDate(this.currentDate);

 // Formater la date actuelle au format attendu par datetime-local
 minDate = this.formatDate(this.currentDate);

 private formatDate(date: Date): string {
   const year = date.getFullYear();
   const month = this.addZero(date.getMonth() + 1);
   const day = this.addZero(date.getDate());
   const hours = this.addZero(date.getHours());
   const minutes = this.addZero(date.getMinutes());
   return `${year}-${month}-${day}T${hours}:${minutes}`;
 }

 private addZero(value: number): string {
   return value < 10 ? `0${value}` : `${value}`;
 }



 generatePDF() {
  const doc = new jsPDF('landscape');
  const table = this.generateTableData();
  const title = 'Liste des incidents';
  doc.setFontSize(16); // Taille de la police
  doc.setFont('helvetica', 'bold');
  doc.text(title, 10, 10);
  
// @ts-ignore
  doc.autoTable({
      head: [['Nom', 'Canal', 'Priorité', 'Client', 'Agence', 'Téléphone', 'Statut', 'Date de création', 'Date de clôture', 'Technicien']],
      body: table,
  });

  doc.save('liste_incidents.pdf');
}


generateTableData() {
  const tableData = [];

  for (const incident of this.incidents) {
      const rowData = [
          incident.nomIncident,
          incident.canalIncident,
          incident.prioriteIncident,
          incident.agence.client.nomClient,
          incident.agence.lieuAgence,
          incident.agence.telephoneAgence,
          incident.statutIncident,
          incident.dateCreationIncident, // Convertir la date en chaîne de caractères
          incident.dateClotureIncident, // Convertir la date en chaîne de caractères
          incident.agence.client.utilisateur.nom,
      ];
      tableData.push(rowData);
  }

  return tableData;
}








}
