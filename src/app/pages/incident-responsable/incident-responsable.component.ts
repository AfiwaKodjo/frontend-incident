import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../incident/incidents.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Agence } from '../agences/agence';
import { Client } from '../clients/client';
import { Incident } from '../incident/incident';
import { Procedure } from '../procedures/procedure';
import { Utilisateurs } from '../utilisateurs/utilisateurs';
import { NotificationService } from 'src/app/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incident-responsable',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,  HttpClientModule,],
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
    <div class="col-12 col-lg-3 mb-3">
        <div class="text-center px-xl-3">
          <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Nouvel incident</button>
        </div>
    </div>

    <div class="col-lg-2  mb-3 d-flex justify-content-end ms-auto">
      <!-- Mettez ici votre barre de recherche -->
      <input class="form-control w-100" (ngModelChange)="searchIncidents(key.value )" #key="ngModel" ngModel
       type="search" placeholder="RECHERCHE..."  id="searchNom" name="key"  required>
    </div> 
    </div>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<div class="container mt-3" id="main-container">
    <h2>Liste des incidents</h2>          
    <table class="custom-table">
      <thead>
        <tr>
          <th>Nom</th>
          <!--th>Description</th-->
          <th>Canal de l'incident</th>
          <th>Priorité</th>
          <th>Client</th>
          <th>Agence</th>
          <th>téléphone</th>
          <!--th>procédure</th>
          <th>Libellé</th-->
          <th>Statut de l'incident</th>
          <th>Date de création</th>
          <th>Date de clôture</th>
          <th>Technicien</th>
          <th>Vos actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let incident of incidents" [class.unclosed-incident]="!incident.dateClotureIncident">
          <td>{{incident.nomIncident}}</td>
          <!--td>{{incident.descriptionIncident}}</td-->
          <td>{{incident.canalIncident}}</td>
          <td style="color: green;"><b>{{incident.prioriteIncident}}</b></td>
          <td>{{incident.agence.client.nomClient}}</td>
          <td>{{incident.agence.lieuAgence}}</td>
          <td>{{incident.agence.telephoneAgence}}</td>
          <!--td>{{incident.procedure.nomProcedure}}</td>
          <td>{{incident.procedure.libelleProcedure}}</td-->
          <td style="color: black;"><b>{{incident.statutIncident}}</b></td>
          <td>{{incident.dateCreationIncident}}</td>
          <td>{{incident.dateClotureIncident}}</td>
          <td><b>{{incident.agence.client.utilisateur.nom}}</b></td>
            <td>
            <!--div class="d-flex align-items-center">
            <button type="button" class="btn btn-outline-info btn-sm btn-circle btn-lg ml-0" (click)="updateIncident(incident.idIncident)"><i class="fa fa-edit" style="color:royalblue;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-sm btn-circle btn-lg ml-0" (click)="onOpenModal(incident,'delete')" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-trash" style="color: red;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-sm btn-circle btn-lg ml-0" (click)="incidentDetails(incident.idIncident)"><i class="fa fa-plus" style="color: green; "></i> </button>
            <button class="btn btn-primary ms-auto me-1" (click)="assignPriority(incident.idIncident)"><i class="bi bi-mailbox"></i> Mail</button>
            </div-->
            <div class="btn-group btn-group-horizontal" role="group" aria-label="Boutons d'action">
            <button type="button" class="btn btn-outline-info btn-sm btn-circle" (click)="updateIncident(incident.idIncident)">
              <i class="fa fa-edit" style="color: royalblue;"></i>
            </button>
            <button type="button" class="btn btn-outline-info btn-sm btn-circle" (click)="onOpenModal(incident,'delete')" data-placement="top" data-toggle="tooltip" data-original-title="Delete">
              <i class="fa fa-trash" style="color: red;"></i>
            </button>
            <button type="button" class="btn btn-outline-info btn-sm btn-circle" (click)="incidentDetails(incident.idIncident)">
              <i class="bi bi-eye-fill" style="color: green;"></i>
            </button>
            <!--button class="btn btn-primary" (click)="assignPriority(incident.idIncident)">
              <i class="bi bi-mailbox"></i> Mail
            </button-->
          </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>


  <div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajout d'incident</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="py-1">
            <form class="form"  (ngSubmit)="onSubmit()">
              <div class="row">
                <div class="col">
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label>Nom de l'incident</label>
                        <input class="form-control" type="text" name="nomIncident" placeholder="Nom incident" id="nomIncident" [(ngModel)]="incident.nomIncident">
                      </div>
                      <br>
                      <div class="form-group">
                      <label for="procedure" >Canal de l'incident</label>
                      <select [(ngModel)]="incident.canalIncident"  class="form-select" name="canalIncident">
                        <option [ngValue]="undefined">--Sélectionnez un canal--</option>
                        <option>Mail</option>
                        <option>Téléphone</option>
                      </select>
                      </div>
                      <br>             
                      <div class="form-group">
                        <label for="procedure" >Priorité de l'incident</label>
                        <select [(ngModel)]="incident.prioriteIncident"  class="form-select" name="prioriteIncident">
                          <option [ngValue]="undefined">--Sélectionnez une priorité--</option>
                          <option>Critique</option>
                          <option>Haute</option>
                          <option>Moyenne</option>
                          <option>Basse</option>
                        </select>
                        </div>
                      <br>
                      <div class="form-group">
                        <label for="procedure" >Statut de l'incident</label>
                        <select [(ngModel)]="incident.statutIncident"  class="form-select" name="statutIncident">
                          <option [ngValue]="undefined">--Sélectionnez un statut--</option>
                          <option>Attente</option>
                          <option>En_cours</option>
                          <option>Terminé</option>
                        </select>
                        </div>      
                      <br>
                      <div class="form-group">
                        <label>Description de l'incident</label>
                        <textarea class="form-control" type="textarea" name="descriptionIncident" placeholder="Décrivez l'incident" id="descriptionIncident" rows="3" [(ngModel)]="incident.descriptionIncident" ></textarea>
                        <br>
                            <div class="form-group">
                              <label>Date de début de l'incident</label>
                              <input class="form-control" type="datetime-local" name="dateCreationIncident" placeholder="Début incident" id="dateCreationIncident" [(ngModel)]="incident.dateCreationIncident" [min]="minDate" [max]="maxDate">
                            </div>
                      <div class="form-group">
                        <label for="agence">Agence</label>
                        <select [(ngModel)]="incident.agence"  class="form-control" name="agence">
                          <option [ngValue]="undefined">--Sélectionnez une agence--</option>
                          <option *ngFor="let agence of agences" [ngValue]="agence">{{agence?.lieuAgence}}</option>
                        </select>
                      </div>    
                      <div class="form-group">
                        <label for="procedure">Procédure</label>
                        <select [(ngModel)]="incident.procedure"  class="form-control" name="procedure">
                          <option [ngValue]="undefined">--Sélectionnez une procédure--</option>
                          <option *ngFor="let procedure of procedures" [ngValue]="procedure">{{procedure?.nomProcedure}}</option>
                        </select>
                      </div> 
                      <br>
                      <!--div class="form-group">
                        <label>Date de clôture de l'incident</label>
                        <input class="form-control" type="datetime-local" name="dateClotureIncident" placeholder="Clôture incident" id="dateClotureIncident" [(ngModel)]="incident.dateClotureIncident">
                      </div-->
                <div class="col">
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
                    </div>                   
              <div class="modal-footer">
                <button type="button" id="" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                  <button class="btn btn-primary" type="submit">Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

   <!--Supprimer un incident-->
   <div class="modal fade" id="deleteIncidentModal" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="deleteIncidentModal">Suppression incident</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer l'incident {{deleteIncident?.nomIncident}} ?</p>     
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
          <button type="button" (click)="onDeleteIncident(deleteIncident.idIncident)" class="btn btn-primary" data-dismiss="modal">Oui</button>
        </div>
      </div>
    </div>
  </div>
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
.btn-circle.btn-lg, .btn-group-lg.btn-circle.btn {
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
    
.demo-inline-calendar-card {
    width: 300px;
  }



  /* Styles pour la table */
.custom-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #ccc; /* Ajout de la bordure au tableau */
    border-radius: 10px; /* Arrondir les coins */
    overflow: hidden; /* Masquer les coins arrondis des éléments internes */
}

/* Styles pour les en-têtes de colonnes */
.custom-table th {
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

/* Styles pour les lignes de la table */
.custom-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

/* Style pour les lignes non clôturées */
.unclosed-incident {
    background-color: rgba(255, 0, 0, 0.5);
}
   
    `
  ]
})
export class IncidentResponsableComponent implements OnInit{
  form: any = {};

  incidents: Incident[] = [];

  idIncident!: number;

  idAgence!: number;
  idClient!: number;
  idProcedure!: number;
  incident: Incident = new Incident();
  
  notification!: string;

  agences: Agence[] = [];

  procedures: Procedure[] = [];

  clients: Client[] = [];

  utilisateurs: Utilisateurs[] = [];

  currentDate = new Date();

  public deleteIncident!: Incident;

  constructor(private incidentsService: IncidentsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getIncidents();
    this.incidentsService.getAgences().subscribe(response => this.agences = response);
    this.incidentsService.getProcedures().subscribe(response => this.procedures = response);
    this.incidentsService.getClients().subscribe(response => this.clients = response);
    this.incidentsService.getUtilisateurs().subscribe(response => this.utilisateurs = response);
    this.notificationService.getNotificationObservable().subscribe(message => {
      this.notification = message;
    });

  }

 private getIncidents() {
    this.incidentsService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }


/* onSubmit(){ 
    let incidentModel: any = {nomIncident: this.incident.nomIncident,
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
   (error: HttpErrorResponse) =>{
    if (error.status === 500) {
     alert("Erreur du serveur !! ");
     this.getIncidents();
  } else if (error.status === 200) {
    alert("L'incident a été ajouté  !!");
    this.getIncidents();
  } else
  {
    alert ("Erreur !!");
    this.getIncidents();
  }
}
    )
    } */  //le vrai


    onSubmit(){ 
      let incidentModel: any = {nomIncident: this.incident.nomIncident,
         descriptionIncident: this.incident.descriptionIncident, dateCreationIncident: this.incident.dateCreationIncident,
         dateClotureIncident: this.incident.dateClotureIncident,prioriteIncident: this.incident.prioriteIncident, statutIncident: this.incident.statutIncident, canalIncident: this.incident.canalIncident,
         agence: {idAgence: this.incident.agence.idAgence, lieuAgence: this.incident.agence.lieuAgence, telephoneAgence: this.incident.agence.telephoneAgence, client:{idClient: this.incident.agence.client.idClient, nomClient: this.incident.agence.client.nomClient, adresseClient: this.incident.agence.client.adresseClient, contactClient: this.incident.agence.client.contactClient, emailClient: this.incident.agence.client.emailClient,
         utilisateur: {id: this.incident.agence.client.utilisateur.id, nom: this.incident.agence.client.utilisateur.nom, prenom: this.incident.agence.client.utilisateur.prenom, mot_de_passe: this.incident.agence.client.utilisateur.mot_de_passe, email: this.incident.agence.client.utilisateur.email, role: this.incident.agence.client.utilisateur.role}}},
         procedure: {idProcedure: this.incident.procedure.idProcedure, nomProcedure: this.incident.procedure.nomProcedure, libelleProcedure: this.incident.procedure.libelleProcedure},
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
        text: 'Erreur du serveur !! '
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
      this.router.navigate(['responsable/incident-detailsResponsable', idIncident]);
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
  this.router.navigate(['/responsable/update-incidentResponsable/idIncident', idIncident]);
    }   
    
    
    /*assignPriority(idIncident: number): void {
      this.incidentsService.assignPriorityToIncident(idIncident).subscribe(
        () => {
          alert('Incident envoyé avec succès !');
          this.getIncidents(); // Rafraîchir la liste des incidents
        },
        (error: HttpErrorResponse) =>{
          if (error.status === 500) {
           alert("Erreur du serveur !! ");
        } else if (error.status === 200) {
          alert('Incident envoyé avec succès !');
        } else
        {
          alert ("Erreur !!");
        }
      }
      );
    }*/

    assignPriorityToIncident(idIncident: number) {
      this.incidentsService.assignPriorityToIncident(idIncident).subscribe(
        () => {
          console.log('Priorité assignée avec succès');
          alert('Incident créé avec succès, priorité assignée et e-mail envoyé au technicien !');
          this.getIncidents();
        },
        (error: any) => {
          console.error('Erreur lors de l\'assignation de priorité:', error);
          alert('Incident créé avec succès, mais erreur lors de l\'assignation de priorité.');
          this.getIncidents();
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


}
