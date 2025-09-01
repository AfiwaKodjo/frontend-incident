import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouvementMateriel } from './mouvement-materiel';
import { MouvementMaterielsService } from './mouvement-materiels.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Incident } from '../incident/incident';
import { Materiel } from '../materiels/materiel';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mouvement-materiels',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [MouvementMaterielsService],
  template: `
  <section class="section dashboard">
  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-12">
      <div class="row">
        <div class="pagetitle">
          <h1>Mouvement matériel</h1>
          <br>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
              <li class="breadcrumb-item active">Mouvement matériel</li>
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
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Nouvel approvisionnement</button>
            </div>
        </div>

    <div class="col-lg-3  mb-3 d-flex justify-content-end ms-auto">
    <!-- Mettez ici votre barre de recherche -->
    <input class="form-control w-100" (ngModelChange)="searchMouvementMateriels(key.value )" #key="ngModel" ngModel
     type="search" placeholder=" RECHERCHE..."  id="searchNom" name="key"  required>
  </div>        
        </div>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
   <h2><b>Liste des mouvements</b></h2>
   <table class="table" id="main-container">
  <thead>
    <tr>
      <th>Libellé mouvement</th>
      <th style="text-align: center">Matériel</th>
      <th style="text-align: center">Quantité du matériel</th>
      <th style="text-align: center">Objet</th>
      <th style="text-align: center">Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <ng-container *ngFor="let mouvementMateriel of mouvementMateriels">
    <tr *ngIf="mouvementMateriel.libelleMouvement_Materiel === 'ENTREE'">
      <td>{{mouvementMateriel.libelleMouvement_Materiel}}</td>
      <td style="text-align: center">{{mouvementMateriel.materiel.nomMateriel}}</td>
      <td style="text-align: center">{{mouvementMateriel.quantiteMouvement_Materiel}}</td>
      <td style="text-align: center">{{mouvementMateriel.objet}}</td>
      <td style="text-align: center">{{mouvementMateriel.date}}</td>
      <td>
            <!-- <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateMouvementMateriel(mouvementMateriel.idMouvement_Materiel)"><i class="fa fa-edit" style="color: royalblue;"></i> </button> -->
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"  (click)="onOpenModal(mouvementMateriel,'delete')"><i class="fa fa-trash" style="color: red;" data-placement="top" data-toggle="tooltip" data-original-title="Delete"></i> </button>
</td>
   
    </tr>
    <tr>
</ng-container>
  </tbody>
</table>
<br>
<div class="container mt-3">
  <h2><b>Demandes en cours</b></h2>
  <table class="table">
  <thead>
    <tr>
      <th>Libellé mouvement</th>
      <th style="text-align: center">Matériel</th>
      <th style="text-align: center">Quantité du matériel</th>
      <th style="text-align: center">Panne</th>
      <th>Statut</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  <ng-container *ngFor="let mouvementMateriel of mouvementMateriels">
    <tr *ngIf="mouvementMateriel.libelleMouvement_Materiel === 'SORTIE' && mouvementMateriel.statut === 'En attente de validation'">
      <td>{{mouvementMateriel.libelleMouvement_Materiel}}</td>
      <td style="text-align: center">{{mouvementMateriel.materiel.nomMateriel}}</td>
      <td style="text-align: center">{{mouvementMateriel.quantiteMouvement_Materiel}}</td>
      <td style="text-align: center">{{mouvementMateriel.incident.nomIncident}}</td>
      <td style="color: red">{{mouvementMateriel.statut}}</td>
      <td>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="validateMouvement(mouvementMateriel.idMouvement_Materiel)"><i class="bi bi-check-circle-fill" style="color: green;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1" (click)="updateMouvementMateriel(mouvementMateriel.idMouvement_Materiel)"><i class="bi bi-x-circle-fill" style="color: red;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"  (click)="onOpenModal(mouvementMateriel,'delete')"><i class="fa fa-trash" style="color: red;" data-placement="top" data-toggle="tooltip" data-original-title="Delete"></i> </button>
</td>
    </tr>
    <tr>
</ng-container>
  </tbody>
  </table>
</div>
<br>
<div class="container mt-3">
  <h2><b>Demandes validées</b></h2>
  <table class="table">
  <thead>
    <tr>
      <th>Libellé mouvement</th>
      <th style="text-align: center">Matériel</th>
      <th style="text-align: center">Quantité du matériel</th>
      <th>Statut</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  <ng-container *ngFor="let mouvementMateriel of mouvementMateriels">
    <tr *ngIf="mouvementMateriel.libelleMouvement_Materiel === 'SORTIE' && mouvementMateriel.statut === 'Validé'">
      <td>{{mouvementMateriel.libelleMouvement_Materiel}}</td>
      <td style="text-align: center">{{mouvementMateriel.materiel.nomMateriel}}</td>
      <td style="text-align: center">{{mouvementMateriel.quantiteMouvement_Materiel}}</td>
      <td style="color: green">{{mouvementMateriel.statut}}</td>
      <td>
            <!-- <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateMouvementMateriel(mouvementMateriel.idMouvement_Materiel)"><i class="fa fa-edit" style="color: royalblue;"></i> </button> -->
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"  (click)="onOpenModal(mouvementMateriel,'delete')"><i class="fa fa-trash" style="color: red;" data-placement="top" data-toggle="tooltip" data-original-title="Delete"></i> </button>
</td>
    </tr>
    <tr>
</ng-container>
  </tbody>
  </table>
</div>


<br>
<div class="container mt-3">
  <h2><b>Demandes rejetées</b></h2>
  <table class="table">
  <thead>
    <tr>
      <th>Libellé mouvement</th>
      <th style="text-align: center">Matériel</th>
      <th style="text-align: center">Quantité du matériel</th>
      <th style="text-align: center">Statut</th>
      <th style="text-align: center">Motif de rejet</th>
    </tr>
  </thead>
  <tbody>
  <ng-container *ngFor="let mouvementMateriel of mouvementMateriels">
    <tr *ngIf="mouvementMateriel.libelleMouvement_Materiel === 'SORTIE' && mouvementMateriel.statut === 'Rejeté'">
      <td>{{mouvementMateriel.libelleMouvement_Materiel}}</td>
      <td style="text-align: center">{{mouvementMateriel.materiel.nomMateriel}}</td>
      <td style="text-align: center">{{mouvementMateriel.quantiteMouvement_Materiel}}</td>
      <td style="color: red; text-align: center">{{mouvementMateriel.statut}}</td>
      <td style="text-align: center">{{mouvementMateriel.motifRejet}}</td>
      <td>
</td>
    </tr>
    <tr>
</ng-container>
  </tbody>
  </table>
</div>





<div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nouvel approvisionnement</h5>
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
                        <input class="form-control" type="text" name="libelleMouvement_Materiel" id="libelleMouvement_Materiel" value="ENTREE" readonly>
                    </div>
                        <div class="form-group">
                          <label for="materiel">Matériel</label>
                          <select [(ngModel)]="mouvementMateriel.materiel" class="form-control" name="materiel">
                            <option [ngValue]="undefined">--Sélectionnez un matériel--</option>
                            <option *ngFor="let materiel of materiels" [ngValue]="materiel">{{materiel.nomMateriel}}</option>
                          </select>
                        </div> 
                        <div class="form-group">
                        <label>Quantité du matériel</label>
                        <input class="form-control" type="number" name="quantiteMouvement_Materiel" placeholder="quantite matériel" id="quantiteMouvement_Materiel" min="1" [(ngModel)]="mouvementMateriel.quantiteMouvement_Materiel" (keydown)="preventInvalidInput($event)">
                        </div>
                        

                        <div class="form-group">
                        <label>Objet</label>
                        <input class="form-control" type="text" name="objet" placeholder="Objet" id="objet" min="1" [(ngModel)]="mouvementMateriel.objet">
                        </div>
                        <div class="form-group">
                        <label>Date</label>
                        <input class="form-control" type="date" name="date" id="date" [(ngModel)]="mouvementMateriel.date"  [min]="currentDate" [max]="currentDate">
                        </div>
                          
      <div class="col">
      </div>
                      
                      </div>
                    </div>
                  </div>
                      </div>                   
                <div class="modal-footer">
                  <button type="button" id="" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    <button class="btn btn-primary" type="submit">Ajouter plus de materiel</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>


     <!--Supprimer un mouvement-matériel-->
  <div class="modal fade" id="deleteMouvementMaterielModal" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="deleteMouvementMaterielModal">Suppression mouvement matériel</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer le mouvement {{deleteMouvementMateriel?.libelleMouvement_Materiel}} ?</p>     
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
          <button type="button" (click)="onDeleteMouvementMateriel(deleteMouvementMateriel.idMouvement_Materiel)" class="btn btn-primary" data-dismiss="modal">Oui</button>
        </div>
      </div>
    </div>
  </div>
  </div>


  `,
  styles: [
    `
    .table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f0f0f0;
}
 `
  ]
})
export class MouvementMaterielsComponent implements OnInit{
  public mouvementMateriels: MouvementMateriel[] = [];
  form: any = {};
  showRejectionForm = false;

  alertMessage: string | undefined;

  idMouvement_Materiel!: number;

  mouvementMateriel: MouvementMateriel = new MouvementMateriel();

  incidents: Incident[] = [];

  materiels: Materiel[] = [];

  motifRejet: string = '';

  public deleteMouvementMateriel!: MouvementMateriel;

  constructor(private mouvementMaterielsService: MouvementMaterielsService, private router: Router, private alertService: AlertService) { }
  ngOnInit(): void {
    this.getMouvementMateriels();
    this.mouvementMaterielsService.getMateriels().subscribe(response => this.materiels = response);
    this.mouvementMaterielsService.getIncidents().subscribe(response => this.incidents = response);

  }


  private getMouvementMateriels() {
    this.mouvementMaterielsService.getMouvementMateriels().subscribe(data => {
      this.mouvementMateriels = data;
    });
  }

  onSubmit(){ 
    console.log(this.mouvementMateriel);
    let mouvementMaterielModel: any = {libelleMouvement_Materiel: "ENTREE", quantiteMouvement_Materiel: this.mouvementMateriel.quantiteMouvement_Materiel, date: this.mouvementMateriel.date, objet: this.mouvementMateriel.objet,motifRejet: this.mouvementMateriel.motifRejet,
       materiel: {idMateriel: this.mouvementMateriel.materiel.idMateriel, nomMateriel: this.mouvementMateriel.materiel.nomMateriel, image:this.mouvementMateriel.materiel.image,quantiteMateriel: this.mouvementMateriel.materiel.quantiteMateriel, numeroSerie: this.mouvementMateriel.materiel.numeroSerie,typeMachine: this.mouvementMateriel.materiel.typeMachine,identifiMachine: this.mouvementMateriel.materiel.identifiMachine}
      }
    console.log(mouvementMaterielModel)
    this.mouvementMaterielsService.createMouvementMateriels(mouvementMaterielModel).subscribe(data =>{
      console.log(data);
      this.getMouvementMateriels();
    },
    /*(error: HttpErrorResponse) =>{
      if (error.status === 500) {
        alert("Erreur du serveur !!");
        this.getMouvementMateriels();
     } else if (error.status === 200) {
       alert('Ajout réussi !!');
       this.getMouvementMateriels();
     } else
     {
       alert ("Erreur !!");
       this.getMouvementMateriels();
     }
      
  }*/

  (error: HttpErrorResponse) => {
    if (error.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur du serveur !! '
      });
      this.getMouvementMateriels();
    } else  if (error.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Ajout réussi !!'
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

    public onDeleteMouvementMateriel(idMouvement_Materiel: number): void{
      this.mouvementMaterielsService.deleteMouvementMateriel(idMouvement_Materiel).subscribe(
        (response: void) => {
          console.log(response);
          this.getMouvementMateriels();
        },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Suppression non autorisée. Revoyez le mouvement !!'
          });
          this.getMouvementMateriels();
        } else  if (error.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le mouvement a été bien supprimé !!'
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
        );
      
    };

    public onOpenModal(mouvementMateriel: MouvementMateriel, mode: string): void{
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode ==='delete'){
        this.deleteMouvementMateriel = mouvementMateriel;
          button.setAttribute('data-target', '#deleteMouvementMaterielModal');
      }
      container!.appendChild(button);
      button.click();
     }

 
     public searchMouvementMateriels(key: string): void{
      console.log(key);
        const results: MouvementMateriel[] = [];
        for (const mouvementMateriel of this.mouvementMateriels){
          if(
          mouvementMateriel.materiel.nomMateriel.toLowerCase().indexOf(key.toLowerCase()) !== -1){
            results.push(mouvementMateriel);
          }
        } 
        this.mouvementMateriels = results;
        if(results.length === 0 || !key){
          this.getMouvementMateriels();
        }
    
    }
   
  updateMouvementMateriel(idMouvement_Materiel: number){
      this.router.navigate(['admin/update-mouvements/idMouvement_Materiel', idMouvement_Materiel]);
    }    


    validateMouvement(idMouvement_Materiel: number) {
      this.mouvementMaterielsService.validateSortie(idMouvement_Materiel).subscribe(
        response => {
          console.log('Validation réussie:', response);
          // Mettez à jour les données ou affichez un message de succès
        },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur du serveur!!  '
          });
          this.getMouvementMateriels();
        } else  if (error.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Sortie du matériel autorisée !!'
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
      );
    }
  
    preventNegativeInput(event: any) {
      if (event.target.value < 0) {
          event.target.value = 1; // Vous pouvez définir une valeur par défaut comme 1
          this.mouvementMateriel.quantiteMouvement_Materiel = 1; // Mettez également à jour votre modèle
      }
  }

  preventInvalidInput(event: KeyboardEvent) {
    // Prevent typing negative numbers, zero, plus sign, and minus sign
    if ((event.key === '-' || event.key === '+' || event.key === '0') || (Number(event.key) < 0 && !event.ctrlKey)) {
      event.preventDefault();
    }
  }

  currentDate = new Date().toISOString().split('T')[0];



  rejeterMouvement(idMouvement: number, motifRejet: string) {
    this.mouvementMaterielsService.rejeterSortieMateriel(idMouvement, motifRejet)
      .subscribe(
        response => {
          console.log('Rejet réussi :', response);
          // Faites ce que vous voulez avec la réponse
        },
        error => {
          console.error('Erreur lors du rejet :', error);
          // Gérez l'erreur comme vous le souhaitez
        }
      );
  }
  
  

}
