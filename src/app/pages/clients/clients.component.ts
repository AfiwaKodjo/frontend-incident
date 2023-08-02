import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsService } from './clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './client';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Utilisateurs } from '../utilisateurs/update-utilisateurs/utilisateurs';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [ClientsService, UtilisateursService],
  template: `
<div class="row">
        <div class="col-12 col-lg-3 mb-3">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Ajout client</button>
            </div>
        </div>

    <div class="col-lg-2  mb-3 d-flex justify-content-end ms-auto">
    <!-- Mettez ici votre barre de recherche -->
    <input class="form-control w-100" (ngModelChange)="searchClients(key.value )" #key="ngModel" ngModel
     type="search" placeholder="Search client..."  id="searchNom" name="key"  required>
  </div>
        </div>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
   <div class="container mt-3">
    <h2>Liste des clients</h2>        
    <table class="table table-striped" id="main-container">
      <thead>
        <tr>
         <th>Nom client</th>
          <th>Adresse client</th>
          <th>Contact client</th>
          <th>Email client</th>
          <th>Acteur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let client of clients">
          <td>{{client.nomClient}}</td>
          <td>{{client.adresseClient}}</td>
          <td>{{client.contactClient}}</td>
          <td>{{client.emailClient}}</td>
          <td>{{client.utilisateur.nom}}</td>
          <td>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateClient(client.idClient)"><i class="fa fa-edit" style="color: royalblue;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1" (click)="onOpenModal(client,'delete')" data-placement="top" data-toggle="tooltip" data-original-title="Delete"><i class="fa fa-trash" style="color: red;"></i></button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
 
  <!--Ajout de client-->

  <div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajout de client</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="py-1">
              <form class="form" (ngSubmit)="onSubmit()" >
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                      <div class="form-group">
                          <label>Insérez un chiffre</label>
                          <input class="form-control" type="number" name="idClient" id="idClient" min="1" placeholder="Chiffre" [(ngModel)]="client.idClient">
                      </div>
                      <br>
                        <div class="form-group">
                          <label>Nom client</label>
                          <input class="form-control" type="text" name="nomClient" placeholder="Nom client" id="nomClient" [(ngModel)]="client.nomClient">
                        </div>
                      <br>
                        <div class="form-group">
                          <label>Adresse client</label>
                          <input class="form-control" type="text" name="adresseClient" placeholder="Adresse client" id="adresseClient" [(ngModel)]="client.adresseClient">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Contact client</label>
                          <input class="form-control" type="text" name="contactClient" placeholder="(00228)/(00229) -- -- -- --" id="contactClient" maxlength="15" [(ngModel)]="client.contactClient" (input)="filterOnlyNumbers($event)">                        
                          <br>
                        <div class="form-group">
                          <label>Email client</label>
                          <input class="form-control" type="email" name="emailClient" placeholder="Email client" id="emailClient" [(ngModel)]="client.emailClient" required email #emailInput="ngModel">
                          <div *ngIf="emailInput.errors && (emailInput.dirty || emailInput.touched)" class="text-danger">
                          <div *ngIf="emailInput?.errors?.['required']">L'e-mail est requis.</div>
                          <div *ngIf="emailInput.errors?.['email']">L'e-mail saisi n'est pas valide.</div>
                        </div>
                        </div>
                         <br>
                        <h3><b>Utilisateur</b></h3>
                        <div class="form-group">
                          <label for="utilisateur" class="col-form-label col-sm-2">Utilisateur</label>
                          <select [(ngModel)]="client.utilisateur" class="form-control" name="utilisateur">
                            <option [ngValue]="undefined">--Sélectionnez un utilisateur--</option>
                            <option *ngFor="let utilisateur of utilisateurs" [ngValue]="utilisateur">{{utilisateur.nom}}</option>
                          </select>
                        </div>
                        <!--div class="form-group">
                          <label>Nom utilisateur</label>
                          <input class="form-control" type="text" name="nom" placeholder="Nom utilisateur" id="nom" [(ngModel)]="client.utilisateur.nom">
                        </div>
                        <div class="form-group">
                          <label>Prenom utilisateur</label>
                          <input class="form-control" type="text" name="prenom" placeholder="Prenom utilisateur" id="prenom" [(ngModel)]="client.utilisateur.prenom">
                        </div>
                        <div class="form-group">
                          <label>Email utilisateur</label>
                          <input class="form-control" type="email" name="email" placeholder="Email utilisateur" id="email" [(ngModel)]="client.utilisateur.email">
                        </div>
                        <div class="form-group">
                          <label>Rôle</label>
                          <input class="form-control" type="text" name="role" placeholder="Rôle utilisateur" id="role" [(ngModel)]="client.utilisateur.role">
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


    <!--Supprimer un client-->
  <div class="modal fade" id="deleteClientModal" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="deleteClientModal">Suppression client</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer le client {{deleteClient?.nomClient}} ?</p>     
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
          <button type="button" (click)="onDeleteClient(deleteClient.idClient)" class="btn btn-primary" data-dismiss="modal">Oui</button>
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
export class ClientsComponent implements OnInit{

  form: any = {};

  clients: Client[] = [];

  idClient!: number;

  client: Client = new Client();

  utilisateurs: Utilisateurs[] = [];

  client1 = {
    emailClient: ''
  };

  public deleteClient!: Client;
  constructor(private clientService: ClientsService, private router: Router, private route: ActivatedRoute, private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.getClients();   
    this.clientService.getUtilisateurs().subscribe(response => this.utilisateurs = response);
  }


  private getClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  onSubmit(){ 
    console.log(this.client);
    let clientModel: any = {idClient: this.client.idClient, nomClient: this.client.nomClient, adresseClient: this.client.adresseClient, contactClient: this.client.contactClient, emailClient: this.client.emailClient, utilisateur: {id: this.client.utilisateur.id, nom: this.client.utilisateur.nom, prenom: this.client.utilisateur.prenom, email: this.client.utilisateur.email, mot_de_passe: this.client.utilisateur.mot_de_passe, role: this.client.utilisateur.role}}
    console.log(clientModel)
    this.clientService.createClient(clientModel).subscribe(data =>{
      console.log(data);
      this.getClients();
    },
    error => alert('Le client a été ajouté !!')
    )

    
    if (!this.isValidEmail(this.client1.emailClient)) {
      console.log('E-mail invalide.');
      return;
    };


    }

  clientDetails(idClient: number){
    this.router.navigate(['admin/clientDetails/id', idClient]);
  }

  /*saveClient(){
    this.clientService.createClient(this.client).subscribe(data =>{
      console.log(data);
      this.goToClientList();
    },
    error => console.log(error)
    );
    
  }*/
  
  goToClientList(){
    this.router.navigate(['/admin/clients'])
  }

 /*onSubmit(){ 
    //console.log(this.client);
    //this.saveClient();
    //console.log(this.saveClient());
    //alert("Ajout réussi");
    this.clientService.createClient(this.client).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error)
    )

    }*/

 /* deleteClient(idClient: number){
    this.clientService.deleteClient(idClient).subscribe(data =>{
      console.log(data);
      this.getClients();
      console.log(this.getClients());
    })
  }*/

  public onDeleteClient(idClient: number): void{
    this.clientService.deleteClient(idClient).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) =>{
        if (error.status === 500) {
          alert("Suppression non autorisée. Revoyez l'agence !! ");
       } else if (error.status === 200) {
         alert("Le client a été bien supprimé !!");
       } else
       {
         alert ("Erreur !!");
       }
      }

      );
    
  }

  public onOpenModal(client: Client, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==='delete'){
      this.deleteClient = client;
        button.setAttribute('data-target', '#deleteClientModal');
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

 
  private isValidEmail(email: string): boolean {
    // Effectuez vos validations personnalisées ici
    // Par exemple, vérifiez le format de l'e-mail, s'il est unique dans la base de données, etc.
    // Renvoyez true si l'e-mail est valide, sinon false
    return true;
  }
 
  public searchClients(key: string): void{
    console.log(key);
      const results: Client[] = [];
      for (const client of this.clients){
        if(client.nomClient.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || client.adresseClient.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.emailClient.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.utilisateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(client);
        }
      } 
      this.clients = results;
      if(results.length === 0 || !key){
        this.getClients();
      }
  
  }

  updateClient(idClient: number){
    this.router.navigate(['admin/update-clients/idClient', idClient]);
  }
  


}
