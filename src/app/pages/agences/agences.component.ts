import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Agence } from './agence';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgenceService } from './agence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../clients/client';
import { ClientsService } from '../clients/clients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agences',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers:[AgenceService, ClientsService],
  template: `
  <section class="section dashboard">
  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-12">
      <div class="row">
        <div class="pagetitle">
          <h1>Agence</h1>
          <br>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
              <li class="breadcrumb-item active">Agence</li>
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
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Nouvelle agence</button>
            </div>
            </div>
            <div class="col-lg-2  mb-3 d-flex justify-content-end ms-auto">
          <!-- Mettez ici votre barre de recherche -->
          <input class="form-control w-100" (ngModelChange)="searchAgences(key.value )" #key="ngModel" ngModel
          type="search" placeholder=" RECHERCHE..."  id="searchNom" name="key"  required>
  </div>
        </div>

        <!--div class="col">
        <div class="col-12 col-lg-3 mb-3 ml-auto">
       
            <hr class="my-1">
        
            <div class="text-center px-xl-3">
                <div><input type="search"
                 class="form-control w-100" id="searchNom " placeholder="search agence....." name="key"  required></div>
              </div>
             
            </div>
        </div-->
       

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<div class="container" id="main-container">
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-uppercase mb-0">Liste des Agences</h5>
            </div>
            <div class="table-responsive">
                <table class="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                     
                      <th scope="col" class="border-0 text-uppercase font-medium">Lieu</th>
                      <th scope="col" class="border-0 text-uppercase font-medium">Téléphone</th>
                      <th scope="col" class="border-0 text-uppercase font-medium">Client</th>
                      <th scope="col" class="border-0 text-uppercase font-medium">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let agence of agences">
                     
                      <td>
                          <h2 class="font-medium mb-0" >{{agence.lieuAgence}}</h2>
                          
                      </td>
                      <td>
                        <h2 class="font-medium mb-0">{{agence.telephoneAgence}}</h2>
                      </td>

                      <td>
                        <h2 class="font-medium mb-0">{{agence.client.nomClient}}</h2>
                      </td>
                      <td>
                        <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateAgence(agence.idAgence)"><i class="fa fa-edit" style="color: blue;"></i> </button>
                        <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1" (click)="onOpenModal(agence,'delete')" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-trash" style="color: red;"></i> </button>
                      </td>
                  </tr>                                       
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div>

<!--Formulaire d'update-->


<!--div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Miseà jour agence</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="py-1">
              <form class="form" novalidate="" >
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label style="align: center">Lieu de l'agence</label>
                          <input class="form-control" type="text" name="lieuAgence" placeholder="Lieu" id="lieuAgence" [(ngModel)]="agence.lieuAgence">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Numéro de Téléphone</label>
                          <input class="form-control" type="text" name="telephoneAgence" placeholder="(00228)/(00229) -- -- -- --" id="telephone" maxlength="15" [(ngModel)]="agence.telephoneAgence">
                          
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
    </div-->

    <!-- Formulaire d'ajout-->

<div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajout d'agence</h5>
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
                      <!--div class="form-group">
                          <label>Insérez un chiffre</label>
                          <input class="form-control" type="number" name="idAgence" id="idAgence" min="1" placeholder="Chiffre" [(ngModel)]="agence.idAgence">
                      </div-->
                      <!--br-->
                        <div class="form-group">
                          <label>Lieu de l'agence</label>
                          <input class="form-control" type="text" name="lieuAgence" placeholder="Lieu" id="lieuAgence" [(ngModel)]="agence.lieuAgence">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Numéro de Téléphone</label>
                          <input class="form-control" type="text" name="telephoneAgence" placeholder="(00228)/(00229) -- -- -- --" id="telephone" maxlength="15" [(ngModel)]="agence.telephoneAgence" (input)="filterOnlyNumbers($event)">
                          <br>
                        <h3><b>Client</b></h3>
                        <div class="form-group">
                          <label for="client" class="col-form-label col-sm-2">Client</label>
                          <select [(ngModel)]="agence.client" class="form-control" name="client">
                            <option [ngValue]="undefined">--Sélectionnez un client--</option>
                            <option *ngFor="let client of clients" [ngValue]="client">{{client.nomClient}}</option>
                          </select>
                        </div> 
                          
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

<!--Supprimer une agence-->
<div class="modal fade" id="deleteAgenceModal" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="deleteAgenceModal">Suppression agence</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer l'agence {{deleteAgence?.lieuAgence}} ?</p>     
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
          <button type="button" (click)="onDeleteAgence(deleteAgence.idAgence)" class="btn btn-primary" data-dismiss="modal">Oui</button>
        </div>
      </div>
    </div>
  </div>
  </div>


  `,
  styles: [`
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
export class AgencesComponent implements OnInit{
  
  form: any = {};
  
  idAgence!: number;
  agences: Agence[] = [];

  agence: Agence = new Agence();

  clients: Client[] = [];
  public deleteAgence!: Agence;

  constructor(private agenceService: AgenceService, private router: Router, private route: ActivatedRoute, private elementRef: ElementRef) {

   }

  ngOnInit(): void {
   this.getAgences();
   this.agenceService.getClients().subscribe((response: any) => this.clients = response);

  }

  
private getAgences(){
  this.agenceService.getAgencesList().subscribe(data => {
    this.agences = data;
  });
}

updateAgence(idAgence: number){
  this.router.navigate(['admin/update-agences/idAgence', idAgence]);
}


 
saveAgence(){
  this.agenceService.createAgence(this.agence).subscribe(data =>{
    console.log(data);
    this.goToAgenceList();
  },
  error => console.log(error)
  );
  
}

goToAgenceList(){
  this.router.navigate(['/admin/agences'])
}

/*onSubmit(){ 
console.log(this.agence);
this.saveAgence();
alert("Ajout réussi");
}*/


onSubmit(){ 
  console.log(this.agence);
  let agenceModel: any = {lieuAgence: this.agence.lieuAgence, telephoneAgence: this.agence.telephoneAgence, client: {idClient: this.agence.client.idClient, nomClient: this.agence.client.nomClient, adresseClient: this.agence.client.adresseClient, contactClient: this.agence.client.contactClient, emailClient: this.agence.client.emailClient, utilisateur:{id: this.agence.client.utilisateur.id, nom: this.agence.client.utilisateur.nom, prenom: this.agence.client.utilisateur.prenom, mot_de_passe: this.agence.client.utilisateur.mot_de_passe, email: this.agence.client.utilisateur.email, role: this.agence.client.utilisateur.role }}}
 console.log(agenceModel)
  this.agenceService.createAgence(agenceModel).subscribe(data =>{
    console.log(data);
    this.getAgences();
  },
  (error: HttpErrorResponse) => {
    if (error.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur du serveur !!'
      });
      this.getAgences();
    } else  if (error.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'L\'agence a été ajoutée !!'
      });
      this.getAgences();
    }else 
    {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur !!'
      });
      this.getAgences();
    }
  }
  )

  }


public onDeleteAgence(idAgence: number): void{
  this.agenceService.deleteAgence(idAgence).subscribe(
    (response: void) => {
      console.log(response);
      this.getAgences();
    },
    (error: HttpErrorResponse) => {
      if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Suppression non autorisée. Revoyez l\'incident !!'
        });
        this.getAgences();
      } else  if (error.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'agence a été bien supprimée !!'
        });
        this.getAgences();
      }else 
      {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur !!'
        });
        this.getAgences();
      }
    }

    );
  
}

public onOpenModal(agence: Agence, mode: string): void{
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if(mode ==='delete'){
    this.deleteAgence = agence;
      button.setAttribute('data-target', '#deleteAgenceModal');
  }
  container!.appendChild(button);
  button.click();
 }

 filterOnlyNumbers(event: any) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  const pattern = /^[0-9]+$/;

  if (!pattern.test(value)) {
    input.value = value.replace(/\D/g, '');
  }
}

public searchAgences(key: string): void{
  console.log(key);
    const results: Agence[] = [];
    for (const agence of this.agences){
      if(agence.lieuAgence.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || agence.client.nomClient.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(agence);
      }
    } 
    this.agences = results;
    if(results.length === 0 || !key){
      this.getAgences();
    }

}


}
