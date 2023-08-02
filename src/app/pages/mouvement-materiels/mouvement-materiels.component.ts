import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouvementMateriel } from './mouvement-materiel';
import { MouvementMaterielsService } from './mouvement-materiels.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Incident } from '../incident/incident';
import { Materiel } from '../materiels/materiel';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mouvement-materiels',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [MouvementMaterielsService],
  template: `
<div class="row">
        <div class="col-12 col-lg-3 mb-3">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Ajout mouvement-matériel</button>
            </div>
        </div>

    <div class="col-lg-3  mb-3 d-flex justify-content-end ms-auto">
    <!-- Mettez ici votre barre de recherche -->
    <input class="form-control w-100" (ngModelChange)="searchMouvementMateriels(key.value )" #key="ngModel" ngModel
     type="search" placeholder="Search mouvement..."  id="searchNom" name="key"  required>
  </div>        
        </div>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
   <table class="table" id="main-container">
  <thead>
    <tr>
      <th>Libellé mouvement</th>
      <th>Quantité mouvement</th>
      <th>Nom incident</th>
      <th>Canal incident</th>
      <th>Nom matériel</th>
      <th>Quantité matériel</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let mouvementMateriel of mouvementMateriels">
      <td>{{mouvementMateriel.libelleMouvement_Materiel}}</td>
      <td>{{mouvementMateriel.quantiteMouvement_Materiel}}</td>
      <td>{{mouvementMateriel.incident.nomIncident}}</td>
      <td>{{mouvementMateriel.incident.canalIncident}}</td>
      <td>{{mouvementMateriel.materiel.nomMateriel}}</td>
      <td>{{mouvementMateriel.materiel.quantiteMateriel}}</td>
      <td>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" ><i class="fa fa-edit" style="color: royalblue;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"><i class="fa fa-trash" style="color: red;" (click)="onOpenModal(mouvementMateriel,'delete')" data-placement="top" data-toggle="tooltip" data-original-title="Delete"></i> </button>
</td>
    </tr>
    <tr>
  </tbody>
</table>



<div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Suivi du mouvement des matériels</h5>
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
                          <input class="form-control" type="number" name="idMouvement_Materiel" id="idMouvement_Materiel" min="1" placeholder="Chiffre" [(ngModel)]="mouvementMateriel.idMouvement_Materiel">
                      </div>
                      <br>
                        <!--div class="form-group">
                          <label>Libellé mouvement</label>
                          <input class="form-control" type="text" name="libelleMouvement_materiel" placeholder="Libellé mouvement matériel" id="libelleMouvement_materiel">
                        </div-->
                        <div class="form-group">
                        <label for="procedure" >Libellé mouvement</label>
                        <select class="form-select" name="libelleMouvement_Materiel"  [(ngModel)]="mouvementMateriel.libelleMouvement_Materiel">
                          <option [ngValue]="undefined">--Sélectionnez un libellé du mouvement--</option>
                          <option>ENTREE</option>
                          <option>SORTIE</option>
                        </select>
                        </div>      
                        <br>
                        <div class="form-group">
                          <label>Quantité mouvement</label>
                          <input class="form-control" type="number" name="quantiteMouvement_Materiel" placeholder="quantite Mouvement materiel" id="quantiteMouvement_Materiel" min="1" [(ngModel)]="mouvementMateriel.quantiteMouvement_Materiel">
                          <br>
                        <h3><b>Matériel</b></h3>
                        <div class="form-group">
                          <label for="materiel" class="col-form-label col-sm-2">Matériel</label>
                          <select [(ngModel)]="mouvementMateriel.materiel" class="form-control" name="materiel">
                            <option [ngValue]="undefined">--Sélectionnez un matériel--</option>
                            <option *ngFor="let materiel of materiels" [ngValue]="materiel">{{materiel.nomMateriel}}</option>
                          </select>
                        </div> 
                        <br>
                        <h3><b>Incident</b></h3>
                        <div class="form-group">
                          <label for="incident" class="col-form-label col-sm-2">Incident</label>
                          <select [(ngModel)]="mouvementMateriel.incident" class="form-control" name="incident">
                            <option [ngValue]="undefined">--Sélectionnez un incident--</option>
                            <option *ngFor="let incident of incidents" [ngValue]="incident">{{incident.nomIncident}}</option>
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

  idMouvement_Materiel!: number;

  mouvementMateriel: MouvementMateriel = new MouvementMateriel();

  incidents: Incident[] = [];

  materiels: Materiel[] = [];

  public deleteMouvementMateriel!: MouvementMateriel;

  constructor(private mouvementMaterielsService: MouvementMaterielsService, private router: Router) { }
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
    let mouvementMaterielModel: any = {idMouvement_Materiel: this.mouvementMateriel.idMouvement_Materiel, libelleMouvement_Materiel: this.mouvementMateriel.libelleMouvement_Materiel, quantiteMouvement_Materiel: this.mouvementMateriel.quantiteMouvement_Materiel,
       incident: {idIncident: this.mouvementMateriel.incident.idIncident, nomIncident: this.mouvementMateriel.incident.nomIncident, descriptionIncident: this.mouvementMateriel.incident.descriptionIncident, dateCreationIncident: this.mouvementMateriel.incident.dateCreationIncident, dateClotureIncident: this.mouvementMateriel.incident.dateClotureIncident, prioriteIncident: this.mouvementMateriel.incident.prioriteIncident, statutIncident: this.mouvementMateriel.incident.statutIncident, canalIncident: this.mouvementMateriel.incident.canalIncident, procedure: {idProcedure: this.mouvementMateriel.incident.procedure.idProcedure, nomProcedure: this.mouvementMateriel.incident.procedure.nomProcedure, libelleProcedure: this.mouvementMateriel.incident.procedure.libelleProcedure, utilisateur: { id: this.mouvementMateriel.incident.procedure.utilisateur.id, nom: this.mouvementMateriel.incident.procedure.utilisateur.nom, prenom: this.mouvementMateriel.incident.procedure.utilisateur.prenom, mot_de_passe: this.mouvementMateriel.incident.procedure.utilisateur.mot_de_passe, email: this.mouvementMateriel.incident.procedure.utilisateur.email, role: this.mouvementMateriel.incident.procedure.utilisateur.role}},
       agence: {idAgence: this.mouvementMateriel.incident.agence.idAgence, lieuAgence: this.mouvementMateriel.incident.agence.lieuAgence, telephoneAgence: this.mouvementMateriel.incident.agence.telephoneAgence,
       client: {idClient: this.mouvementMateriel.incident.agence.client.idClient, nomClient: this.mouvementMateriel.incident.agence.client.nomClient, adresseClient: this.mouvementMateriel.incident.agence.client.adresseClient, contactClient: this.mouvementMateriel.incident.agence.client.contactClient, emailClient: this.mouvementMateriel.incident.agence.client.emailClient,
       utilisateur: {id: this.mouvementMateriel.incident.agence.client.utilisateur.id, nom: this.mouvementMateriel.incident.agence.client.utilisateur.nom, prenom: this.mouvementMateriel.incident.agence.client.utilisateur.prenom, mot_de_passe: this.mouvementMateriel.incident.agence.client.utilisateur.mot_de_passe, email: this.mouvementMateriel.incident.agence.client.utilisateur.email, role: this.mouvementMateriel.incident.agence.client.utilisateur.role}}}},
       materiel: {idMateriel: this.mouvementMateriel.materiel.idMateriel, nomMateriel: this.mouvementMateriel.materiel.nomMateriel, quantiteMateriel: this.mouvementMateriel.materiel.quantiteMateriel, procedure: {idProcedure: this.mouvementMateriel.materiel.procedure.idProcedure, nomProcedure: this.mouvementMateriel.materiel.procedure.nomProcedure, libelleProcedure: this.mouvementMateriel.materiel.procedure.libelleProcedure, utilisateur: {id: this.mouvementMateriel.materiel.procedure.utilisateur.id, nom: this.mouvementMateriel.materiel.procedure.utilisateur.nom, prenom: this.mouvementMateriel.materiel.procedure.utilisateur.prenom, mot_de_passe: this.mouvementMateriel.materiel.procedure.utilisateur.mot_de_passe, email: this.mouvementMateriel.materiel.procedure.utilisateur.email, role: this.mouvementMateriel.materiel.procedure.utilisateur.role}}}
      }
    console.log(mouvementMaterielModel)
    this.mouvementMaterielsService.createMouvementMateriels(mouvementMaterielModel).subscribe(data =>{
      console.log(data);
      this.getMouvementMateriels();
    },
    error => alert('Ajout réussi !!')
  
    )

    }

    public onDeleteMouvementMateriel(idMouvement_Materiel: number): void{
      this.mouvementMaterielsService.deleteMouvementMateriel(idMouvement_Materiel).subscribe(
        (response: void) => {
          console.log(response);
          this.getMouvementMateriels();
        },
        (error: HttpErrorResponse) =>{
          if (error.status === 500) {
            alert("Suppression non autorisée. Revoyez le mouvement !! ");
         } else if (error.status === 200) {
           alert("Le mouvement a été bien supprimé !!");
         } else
         {
           alert ("Erreur !!");
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
          if(mouvementMateriel.incident.nomIncident.toLowerCase().indexOf(key.toLowerCase()) !== -1 
          || mouvementMateriel.materiel.nomMateriel.toLowerCase().indexOf(key.toLowerCase()) !== -1){
            results.push(mouvementMateriel);
          }
        } 
        this.mouvementMateriels = results;
        if(results.length === 0 || !key){
          this.getMouvementMateriels();
        }
    
    }
         


}
