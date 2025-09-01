import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielsService } from './materiels.service';
import { Materiel } from './materiel';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Procedure } from '../procedures/procedure';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materiels',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [MaterielsService],
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
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Nouveau matériel</button>
            </div>
        </div>

    <div class="col-lg-2  mb-3 d-flex justify-content-end ms-auto">
    <!-- Mettez ici votre barre de recherche -->
    <input class="form-control w-100" (ngModelChange)="searchMateriels(key.value )" #key="ngModel" ngModel
     type="search" placeholder="RECHERCHE..."  id="searchNom" name="key"  required>
  </div>  
        </div>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <h2>Liste des matériels</h2>
   <table class="table caption-top" id='main-container'>
  <thead class="table-dark">
    <tr>
    <th scope="col">Image du matériel</th>
      <th scope="col">Numéro du modèle</th>
      <th scope="col">Nom du matériel</th>
      <th scope="col">Type Hôte machine</th>
      <th scope="col">Identifiant Hôte machine</th>
      <th scope="col">Qté en stock</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let materiel of materiels">
      <td class="align-middle"><img height="100" weight="100" [src]="host+materiel.idMateriel"></td>
      <td class="align-middle"><h3>{{materiel.numeroSerie}}</h3></td>
      <td class="align-middle"><h3>{{materiel.nomMateriel}}</h3></td>
      <td class="align-middle"><h3>{{materiel.typeMachine}}</h3></td>
      <td class="align-middle"><h3>{{materiel.identifiMachine}}</h3></td>
      <td class="align-middle"><h3>{{materiel.quantiteMateriel}}</h3></td>
      <td class="align-middle">
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateMateriel(materiel.idMateriel)"><i class="fa fa-edit" style="color: royalblue;"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1" (click)="onOpenModal(materiel,'delete')" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-trash" style="color: red;"></i> </button>
      </td>
    </tr>
    
  </tbody>
</table>  



 <!-- Formulaire d'ajout-->

 <div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajout de matériel</h5>
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
                          <label>Numéro du modèle</label>
                          <input class="form-control" type="text" name="numeroSerie" placeholder="Numéro du modèle" id="numeroSerie" [(ngModel)]="materiel.numeroSerie">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Nom du matériel</label>
                          <input class="form-control" type="text" name="nomMateriel" placeholder="Nom matériel" id="nomMateriel" [(ngModel)]="materiel.nomMateriel">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Image du matériel</label>
                          <input class="form-control" type="file" name="image" id="image" accept="image/*" (change)="onImageSelected($event)">
                          <img [src]="imgURL" height="200" *ngIf="imgURL">
                        </div>
                        <br>
                        <div class="form-group">
                        <label for="materiel" >Type hôte machine</label>
                        <select [(ngModel)]="materiel.typeMachine"  class="form-select" name="typeMachine" (change)="getTypeMachine()">
                          <option [ngValue]="undefined">--Sélectionnez un type--</option>
                          <option>GAB</option>
                          <option>SERVEUR</option>
                          <option>IMPRIMANTE</option>
                        </select>
                        </div>      
                      <br>
                        <div class="form-group">
                          <label>Identifiant hôte machine</label>
                          <input class="form-control" type="text" name="identifiMachine" placeholder="Identifiant hôte machine" id="identifiMachine" [(ngModel)]="materiel.identifiMachine">
                        </div>
                    
                        
                      <!--div class="form-group">
                        <label for="procedure" class="col-form-label col-sm-2">Procédure</label>
                        <select [(ngModel)]="materiel.procedure"  class="form-control" name="procedure">
                          <option [ngValue]="undefined">--Sélectionnez une procédure--</option>
                          <option *ngFor="let procedure of procedures" [ngValue]="procedure">{{procedure.nomProcedure}}</option>
                        </select>
                      </div--> 
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

  <!--Supprimer un matériel-->
  <div class="modal fade" id="deleteMaterielModal" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="deleteIncidentModal">Suppression matériel</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer le matériel {{deleteMateriel?.nomMateriel}} ?</p>     
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
          <button type="button" (click)="onDeleteMateriel(deleteMateriel.idMateriel)" class="btn btn-primary" data-dismiss="modal">Oui</button>
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
export class MaterielsComponent implements OnInit{

  form: any = {};

  idMateriel!: number;

  materiel: Materiel = new Materiel();

  procedure: Procedure[] = [];

  public deleteMateriel!: Materiel;

  selectedImageFile!: any ;

  imgURL: any;
  message!: string;
  imagePath: any;
  host = "http://localhost:8080/api/files/Images/";

  constructor(private materielsService: MaterielsService, private router: Router) { }


  public materiels: Materiel[] = [];

  ngOnInit(): void {
    this.getMateriels();
    this.materielsService.getProcedures().subscribe(response => this.procedure = response);

  }

  private getMateriels() {
    this.materielsService.getMateriels().subscribe(data => {
      this.materiels = data;
    });
  }

  onSubmit() {
    let materielModel: any = {nomMateriel:this.materiel.nomMateriel, image: this.materiel.image, numeroSerie: this.materiel.numeroSerie, typeMachine: this.materiel.typeMachine, identifiMachine: this.materiel.identifiMachine}
    const formData = new FormData();
    formData.append('materiel', JSON.stringify(this.materiel));
    formData.append('numeroSerie', materielModel.numeroSerie);
    formData.append('nomMateriel', materielModel.nomMateriel);
    formData.append('typeMachine', materielModel.typeMachine);
    formData.append('quantiteMateriel', "0");
    formData.append('identifiMachine', materielModel.identifiMachine);
    formData.append('file', this.selectedImageFile, this.selectedImageFile.name);
console.log(materielModel);
    this.materielsService.createMateriel(formData).subscribe(
        (response) => {
            console.log('Réponse de l\'API :', response);
            // Réinitialisez les valeurs du formulaire ici si nécessaire
        },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Ce matériel existe déjà !! '
          });
          this.getMateriels();
        } else  if (error.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Ajout réussi !!'
          });
          this.getMateriels();
        }else 
        {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur !!'
          });
          this.getMateriels();
        }
      }
    );
}



onImageSelected(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.selectedImageFile = file;

    var mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/) == null){
      this.message = "Only images are supported"
      return;
    }

    var reader = new FileReader();

    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) =>{
      this.imgURL = reader.result;
    }
  }
}


    public onDeleteMateriel(idMateriel: number): void{
      this.materielsService.deleteMateriel(idMateriel).subscribe(
        (response: void) => {
          console.log(response);
          this.getMateriels();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Suppression non autorisée. Revoyez le mouvement!!  '
            });
            this.getMateriels();
          } else  if (error.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Le matériel a été bien supprimé.'
            });
            this.getMateriels();
          }else 
          {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Erreur !!'
            });
            this.getMateriels();
          }
        }
  
        );
      
    }

    public onOpenModal(materiel: Materiel, mode: string): void{
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode ==='delete'){
        this.deleteMateriel = materiel;
          button.setAttribute('data-target', '#deleteMaterielModal');
      }
      container!.appendChild(button);
      button.click();
     }

    public searchMateriels(key: string): void{
      console.log(key);
        const results: Materiel[] = [];
        for (const materiel of this.materiels){
          if(materiel.nomMateriel.toLowerCase().indexOf(key.toLowerCase()) !== -1 
          ){
            results.push(materiel);
          }
        } 
        this.materiels = results;
        if(results.length === 0 || !key){
          this.getMateriels();
        }
    
    }

    updateMateriel(idMateriel: number){
      this.router.navigate(['admin/update-materiels/idMateriel', idMateriel]);
    }   
    
    
    getTypeMachine(){

      console.log(this.materiel.typeMachine);
    }

}
