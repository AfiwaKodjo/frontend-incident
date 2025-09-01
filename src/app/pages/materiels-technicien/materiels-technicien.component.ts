import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Materiel } from '../materiels/materiel';
import { MaterielsService } from '../materiels/materiels.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Procedure } from '../procedures/procedure';
import { MouvementMaterielsService } from '../mouvement-materiels/mouvement-materiels.service';
import { Router } from '@angular/router';
import { MouvementMateriel } from '../mouvement-materiels/mouvement-materiel';
import { Incident } from '../incident/incident';
import { IncidentsService } from '../incident/incidents.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materiels-technicien',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
  <section class="section dashboard">
  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-12">
      <div class="row">
        <div class="pagetitle">
          <h1>Matériel</h1>
          <br>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
              <li class="breadcrumb-item active">Matériel</li>
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
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Demande de sortie</button>
            </div>
        </div>

    <div class="col-lg-2  mb-3 d-flex justify-content-end ms-auto">
    <!-- Mettez ici votre barre de recherche -->
    <input class="form-control w-100" (ngModelChange)="searchMateriels(key.value)" #key="ngModel" ngModel
     type="search" placeholder="RECHERCHE..."  id="searchNom" name="key"  required>
  </div>  
        </div>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <h2>Liste des matériels</h2>
   <table class="table caption-top">
  <thead class="table-dark">
    <tr>
     <th scope="col">Image du matériel</th>
      <th scope="col">Nom du matériel</th>
      <th scope="col">Quantité du matériel</th>
    </tr>
  </thead>
  <tbody>
  <ng-container *ngFor="let materiel of materiels">
    <tr *ngIf="materiel.quantiteMateriel > 0">
      <td class="align-middle"><img height="100" weight="100" [src]="host+materiel.idMateriel"></td>
      <td class="align-middle"><h3>{{materiel.nomMateriel}}</h3></td>
      <td class="align-middle"><h3>{{materiel.quantiteMateriel}}</h3></td>
    </tr>
  </ng-container>
  </tbody>
</table>
<br>

<div class="container mt-3">
  <h2><b>Etat des demandes</b></h2>
  <table class="table">
  <thead>
    <tr>
      <th class="align-middle">Libellé mouvement</th>
      <th class="align-middle">Matériel</th>
      <th class="align-middle">Quantité du matériel</th>
      <th class="align-middle">Statut</th>
        <th class="align-middle">Motif de rejet</th>
      <!-- <th>Actions</th> -->
    </tr>
  </thead>
  <tbody>
  <ng-container *ngFor="let mouvementMateriel of mouvementMateriels" >
    <tr *ngIf="mouvementMateriel.libelleMouvement_Materiel === 'SORTIE' && mouvementMateriel.statut === 'En attente de validation' || mouvementMateriel.statut === 'Validé' || mouvementMateriel.statut === 'Rejeté'">
      <td class="align-middle">{{mouvementMateriel.libelleMouvement_Materiel}}</td>
      <td class="align-middle">{{mouvementMateriel.materiel.nomMateriel}}</td>
      <td class="align-middle">{{mouvementMateriel.quantiteMouvement_Materiel}}</td>
      <td [style.color]="mouvementMateriel.statut === 'Validé' ? 'green' : 'red'" class="align-middle">{{mouvementMateriel.statut}}</td>
      <td>{{ mouvementMateriel.motifRejet }}</td>      <!--td>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateMouvementMateriel(mouvementMateriel.idMouvement_Materiel)"><i class="fa fa-edit" style="color: royalblue;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"  (click)="onOpenModal(mouvementMateriel,'delete')"><i class="fa fa-trash" style="color: red;" data-placement="top" data-toggle="tooltip" data-original-title="Delete"></i> </button>
</td-->
    </tr>
    <tr>
</ng-container>
  </tbody>
  </table>
</div>



<!-- Formulaire d'ajout-->

<div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Demande de sortie de matériel</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="py-1">
              <form class="form" (ngSubmit)="onSubmit()">
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                      <div class="form-group">
                          <label for="libelleMouvement_Materiel">Libellé mouvement</label>
                          <input class="form-control" type="text" name="libelleMouvement_Materiel" id="libelleMouvement_Materiel" value="SORTIE" readonly>
                      </div>
                        <div class="form-group">
                          <label>Nom de l'incident</label>
                          <select class="form-control" name="nomIncident" id="nomIncident" [(ngModel)]="mouvementMateriel.incident">
                                <option [value]="undefined">Sélectionnez un incident</option>
                                <option *ngFor="let incident of incidents" [ngValue]="incident">{{ incident.nomIncident }}</option>
                            </select>
                        </div>   
                        <br>
                        <div class="form-group">
                            <label>Nom du matériel</label>
                            <select class="form-control" name="nomMateriel" id="nomMateriel" [(ngModel)]="mouvementMateriel.materiel">
                                <option [value]="undefined">Sélectionnez un matériel</option>
                                <option *ngFor="let materiel of materiels" [ngValue]="materiel">{{ materiel.nomMateriel }}</option>
                            </select>
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Quantité du matériel</label>
                          <input class="form-control" type="number" name="quantiteMouvement_Materiel" placeholder="Quantité du matériel" id="quantiteMouvement_Materiel" min="1" [(ngModel)]="mouvementMateriel.quantiteMouvement_Materiel" (keydown)="preventInvalidInput($event)" required>    
                          
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
export class MaterielsTechnicienComponent implements OnInit{
  host = "http://localhost:8080/api/files/Images/";
  form: any = {};

  idMateriel!: number;

  materiel: Materiel = new Materiel();

  incident: Incident = new Incident();

  procedure: Procedure[] = [];

  public deleteMateriel!: Materiel;
  mouvementMateriel: MouvementMateriel = new MouvementMateriel();

 



  constructor(private materielsService: MaterielsService, private mouvementMaterielsService: MouvementMaterielsService, private router: Router, private incidentsService: IncidentsService) { }


  public materiels: Materiel[] = [];
  public incidents: Incident[] = [];
  public mouvementMateriels: MouvementMateriel[] = [];
  ngOnInit(): void {
    this.getMateriels();
    this.getIncidents();
    this.getMouvementMateriels();
  }

  private getMateriels() {
    this.materielsService.getMateriels().subscribe(data => {
      this.materiels = data;
    });
  }
  private getIncidents() {
    this.incidentsService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }

  private getMouvementMateriels() {
    this.mouvementMaterielsService.getMouvementMateriels().subscribe(data => {
      this.mouvementMateriels = data;
    });
  }

  onSubmit(){ 
    console.log(this.mouvementMateriel);
    let mouvementMaterielModel: any = {libelleMouvement_Materiel:"SORTIE", quantiteMouvement_Materiel: this.mouvementMateriel.quantiteMouvement_Materiel,motifRejet:this.mouvementMateriel.motifRejet, materiel: {idMateriel: this.mouvementMateriel.materiel.idMateriel, nomMateriel: this.mouvementMateriel.materiel.nomMateriel, image: this.mouvementMateriel.materiel.image, quantiteMateriel: this.mouvementMateriel.materiel.quantiteMateriel, typeMachine: this.mouvementMateriel.materiel.typeMachine, identifiMachine: this.mouvementMateriel.materiel.identifiMachine, numeroSerie: this.mouvementMateriel.materiel.numeroSerie},
    incident:{idIncident: this.mouvementMateriel.incident.idIncident, nomIncident: this.mouvementMateriel.incident.nomIncident, descriptionIncident: this.mouvementMateriel.incident.descriptionIncident,
    dateCreationIncident: this.mouvementMateriel.incident.dateCreationIncident, dateClotureIncident: this.mouvementMateriel.incident.dateClotureIncident, prioriteIncident: this.mouvementMateriel.incident.prioriteIncident,
    statutIncident: this.mouvementMateriel.incident.statutIncident, canalIncident: this.mouvementMateriel.incident.canalIncident, agence: {idAgence: this.mouvementMateriel.incident.agence.idAgence, lieuAgence: this.mouvementMateriel.incident.agence.lieuAgence, telephoneAgence: this.mouvementMateriel.incident.agence.telephoneAgence,
    client: {idClient: this.mouvementMateriel.incident.agence.client.idClient, nomClient: this.mouvementMateriel.incident.agence.client.nomClient, emailClient: this.mouvementMateriel.incident.agence.client.emailClient, adresseClient: this.mouvementMateriel.incident.agence.client.adresseClient, contactClient: this.mouvementMateriel.incident.agence.client.contactClient, 
    utilisateur: {id: this.mouvementMateriel.incident.agence.client.utilisateur.id, nom: this.mouvementMateriel.incident.agence.client.utilisateur.nom, prenom: this.mouvementMateriel.incident.agence.client.utilisateur.prenom, mot_de_passe: this.mouvementMateriel.incident.agence.client.utilisateur.mot_de_passe, email: this.mouvementMateriel.incident.agence.client.utilisateur.email, role: this.mouvementMateriel.incident.agence.client.utilisateur.role}}}},
    procedure: {idProcedure: this.mouvementMateriel.incident.procedure.idProcedure, nomProcedure: this.mouvementMateriel.incident.procedure.nomProcedure, libelleProcedure: this.mouvementMateriel.incident.procedure.libelleProcedure}}
   this.mouvementMaterielsService.createMouvementMateriels(mouvementMaterielModel).subscribe(data =>{
      console.log(data);
      this.getMouvementMateriels();
    },
  (error: HttpErrorResponse) => {
    if (error.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'La quantité de sortie demandée excède la quantité disponible. !! '
      });
      this.getMouvementMateriels();
    } else  if (error.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'En attente de validation !!'
      });
      this.getMouvementMateriels();
    }else 
    {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur !!'
      });
      this.getMouvementMateriels();
    }
  }
    )

    }


    /*validateMouvement(idMouvement_Materiel: number) {
      this.mouvementMaterielsService.validateSortie(idMouvement_Materiel).subscribe(
        response => {
          console.log('Validation réussie:', response);
          // Mettez à jour les données ou affichez un message de succès
        },
        (error: HttpErrorResponse) =>{
          if (error.status === 500) {
            alert("La quantité de sortie excède la quantité disponible.!! ");
            this.getMouvementMateriels();
         } else if (error.status === 200) {
           alert("Demande en attente de validation !!");
           this.getMouvementMateriels();
         } else
         {
           alert ("Erreur !!");
           this.getMouvementMateriels();
         }
          
      }
      );
    }*/
  
    
    public searchMateriels(key: string): void{
      console.log(key);
        const results: Materiel[] = [];
        for (const materiel of this.materiels){
          if(materiel.nomMateriel.toLowerCase().indexOf(key.toLowerCase()) !== -1 
          //|| materiel.identifiMachine.toLowerCase().indexOf(key.toLowerCase()) !== -1
          //|| materiel.typeMachine.toLowerCase().indexOf(key.toLowerCase()) !== -1
          //|| materiel.numeroSerie.toLowerCase().indexOf(key.toLowerCase()) !== -1
          ){
            results.push(materiel);
          }
        } 
        this.materiels = results;
        if(results.length === 0 || !key){
          this.getMateriels();
        }
    
    }   


    preventInvalidInput(event: KeyboardEvent) {
    // Prevent typing negative numbers, zero, plus sign, and minus sign
    if ((event.key === '-' || event.key === '+' || event.key === '0') || (Number(event.key) < 0 && !event.ctrlKey)) {
      event.preventDefault();
    }
  };
  hasRejectedMouvements: boolean = this.mouvementMateriels.some(mouvementMateriel => mouvementMateriel.statut === 'Rejeté');

 

}
