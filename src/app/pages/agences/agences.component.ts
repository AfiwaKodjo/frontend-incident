import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Agence } from './agence';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgenceService } from './agence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../clients/client';
import { ClientsService } from '../clients/clients.service';

@Component({
  selector: 'app-agences',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers:[AgenceService, ClientsService],
  template: `
<div class="row">
        <div class="col-12 col-lg-3 mb-3 ms-auto">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Ajout agence</button>
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
<div class="container">
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-uppercase mb-0">Agences</h5>
            </div>
            <div class="table-responsive">
                <table class="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                     
                      <th scope="col" class="border-0 text-uppercase font-medium">Lieu</th>
                      <th scope="col" class="border-0 text-uppercase font-medium">Téléphone</th>
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
                        <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateAgence(agence.idAgence)"><i class="fa fa-edit" style="color: blue;"></i> </button>
                        <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1" (click)="deleteAgence(agence.idAgence)"><i class="fa fa-trash" style="color: red;"></i> </button>
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
                      <div class="form-group">
                          <label>Insérez un chiffre</label>
                          <input class="form-control" type="number" name="idAgence" id="idAgence" min="1" placeholder="Chiffre" [(ngModel)]="agence.idAgence">
                      </div>
                      <br>
                        <div class="form-group">
                          <label>Lieu de l'agence</label>
                          <input class="form-control" type="text" name="lieuAgence" placeholder="Lieu" id="lieuAgence" [(ngModel)]="agence.lieuAgence">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Numéro de Téléphone</label>
                          <input class="form-control" type="text" name="telephoneAgence" placeholder="(00228)/(00229) -- -- -- --" id="telephone" maxlength="15" [(ngModel)]="agence.telephoneAgence">
                          <br>
                        <h3><b>Client</b></h3>
                        <div class="form-group">
                          <label for="utilisateur" class="col-form-label col-sm-2">Client</label>
                          <select [(ngModel)]="agence.client" class="form-control" name="client">
                            <option [ngValue]="undefined">--Sélectionnez un client--</option>
                            <option *ngFor="let client of client" [ngValue]="client">{{client.nomClient}}</option>
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

  client: Client[] = [];
  clientsService: any;
  utilisateurs: any;

  constructor(private agenceService: AgenceService, private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
   this.getAgences();
   this.clientsService.getUtilisateurs().subscribe((response: any) => this.utilisateurs = response);

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
  let agenceModel: any = {idAgence: this.agence.idAgence, lieuAgence: this.agence.lieuAgence, client: {idClient: this.agence.client.idClient, nomClient: this.agence.client.nomClient, adresseClient: this.agence.client.adresseClient, contactClient: this.agence.client.contactClient, emailClient: this.agence.client.emailClient, utilisateur:{id: this.agence.client.utilisateur.id, nom: this.agence.client.utilisateur.nom, prenom: this.agence.client.utilisateur.prenom, mot_de_passe: this.agence.client.utilisateur.mot_de_passe, email: this.agence.client.utilisateur.email, role: this.agence.client.utilisateur.role }}}
  console.log(agenceModel)
  /*this.agenceService.createAgence(agenceModel).subscribe(data =>{
    console.log(data);
    this.getAgences();
  },
  error => console.log(error)
  )*/

  }

deleteAgence(idAgence: number){
  this.agenceService.deleteAgence(idAgence).subscribe(data =>{
    console.log(data);
    this.getAgences();
  })
}

}
