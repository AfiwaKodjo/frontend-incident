import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Procedure } from './procedure';
import { ProceduresService } from './procedures.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Utilisateurs } from '../utilisateurs/utilisateurs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procedures',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  template: `

<!--div class="row">
        <div class="col-12 col-lg-3 mb-3 ms-auto">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Ajout procédure</button>
            </div>
        </div>
        </div-->

        <div class="row">
  <div class="col-12 col-lg-3 mb-3">
    <div class="text-center px-xl-3">
      <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2">Ajout procédure</button>
    </div>
  </div>

  <div class="col-lg-2  mb-3 d-flex justify-content-end ms-auto">
    <!-- Mettez ici votre barre de recherche -->
    <input class="form-control w-100" (ngModelChange)="searchProcedures(key.value )" #key="ngModel" ngModel
     type="search" placeholder="Search procedure..."  id="searchNom" name="key"  required>
  </div>
</div>

     
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
   <table class="table table-dark table-striped" id='main-container'>
  <thead>
    <tr>
      <th scope="col">Libellé Procédure</th>
      <th scope="col">Nom Procédure</th>
      <th scope="col">Acteur</th>
      <th scope="col">Rôle</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let procedure of procedures">
      <td><h2>{{procedure.nomProcedure}}</h2></td>
      <td><h2>{{procedure.libelleProcedure}}</h2></td>
      <td><h2>{{procedure.utilisateur.nom}}</h2></td>
      <td><h2>{{procedure.utilisateur.role}}</h2></td>
      <td>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" (click)="updateProcedure(procedure.idProcedure)"><i class="fa fa-edit" style="color: white;"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"><i class="fa fa-trash" style="color: red;" (click)="onOpenModal(procedure,'delete')" data-placement="top" data-toggle="tooltip" data-original-title="Delete"></i> </button>
      </td>
    </tr>
    <tr>
  </tbody>
</table>


 <!-- Formulaire d'ajout-->

 <div class="modal fade" role="dialog" tabindex="-1" id="user-form-modal2">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajout de procédure</h5>
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
                          <input class="form-control" type="number" name="idProcedure" id="idProcedure" min="1" placeholder="Chiffre" [(ngModel)]="procedure.idProcedure">
                      </div>
                      <br>
                        <div class="form-group">
                          <label>Nom de la procédure</label>
                          <input class="form-control" type="text" name="nomProcedure" placeholder="Nom procédure" id="nomProcedure" [(ngModel)]="procedure.nomProcedure">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Libellé de la procédure</label>
                          <textarea class="form-control" type="textarea" name="libelleProcedure" placeholder="Décrivez la procédure" id="libelleProcedure" rows="3" [(ngModel)]="procedure.libelleProcedure"></textarea>
                        <h3><b>Utilisateur</b></h3>
                        <div class="form-group">
                          <label for="utilisateur" class="col-form-label col-sm-2">Utilisateur</label>
                          <select [(ngModel)]="procedure.utilisateur" class="form-control" name="utilisateur">
                            <option [ngValue]="undefined">--Sélectionnez un utilisateur--</option>
                            <option *ngFor="let utilisateur of utilisateurs" [ngValue]="utilisateur">{{utilisateur?.nom}}</option>
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

    <!--Supprimer une démarche-->
  <div class="modal fade" id="deleteProcedureModal" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="deleteProcedureModal">Suppression procédure</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer la procédure {{deleteProcedure?.nomProcedure}} ?</p>     
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
          <button type="button" (click)="onDeleteProcedure(deleteProcedure.idProcedure)" class="btn btn-primary" data-dismiss="modal">Oui</button>
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
}`
  ]
})
export class ProceduresComponent implements OnInit{

  form: any = {};

  procedures: Procedure[] = [];

  idProcedure!: number;

  procedure: Procedure = new Procedure();

  public deleteProcedure!: Procedure;

  utilisateurs: Utilisateurs[] = [];
  constructor(private proceduresService: ProceduresService, private router: Router) { }

  ngOnInit(): void {
    this.getProcedures();
    this.proceduresService.getUtilisateurs().subscribe(response => this.utilisateurs = response);

  }

  private getProcedures() {
    this.proceduresService.getProcedures().subscribe(data => {
      this.procedures = data;
    });
  }

  onSubmit(){ 
    console.log(this.procedure);
    let procedureModel: any = {idProcedure: this.procedure.idProcedure, nomProcedure: this.procedure.nomProcedure, libelleProcedure: this.procedure.libelleProcedure, utilisateur: {id: this.procedure.utilisateur.id, nom: this.procedure.utilisateur.nom, prenom: this.procedure.utilisateur.prenom, email: this.procedure.utilisateur.email, mot_de_passe: this.procedure.utilisateur.mot_de_passe, role: this.procedure.utilisateur.role}}
    console.log(procedureModel)
    this.proceduresService.createProcedure(procedureModel).subscribe(data =>{
      console.log(data);
      this.getProcedures();
    },
    error => alert('La procédure a été ajoutée !!')
    )

    }


    public onDeleteProcedure(idProcedure: number): void{
      this.proceduresService.deleteProcedure(idProcedure).subscribe(
        (response: void) => {
          console.log(response);
          this.getProcedures();
        },
        (error: HttpErrorResponse) =>{
          if (error.status === 500) {
            alert("Suppression non autorisée. Revoyez le matériel !! ");
         } else if (error.status === 200) {
           alert("La procédure a été bien supprimée !!");
         } else
         {
           alert ("Erreur !!");
         }
        }
  
        );
      
    }

  

public onOpenModal(procedure: Procedure, mode: string): void{
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if(mode ==='delete'){
    this.deleteProcedure = procedure;
      button.setAttribute('data-target', '#deleteProcedureModal');
  }
  container!.appendChild(button);
  button.click();
 }


 public searchProcedures(key: string): void{
  console.log(key);
    const results: Procedure[] = [];
    for (const procedure of this.procedures){
      if(procedure.nomProcedure.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || procedure.libelleProcedure.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || procedure.utilisateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || procedure.utilisateur.role.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(procedure);
      }
    } 
    this.procedures = results;
    if(results.length === 0 || !key){
      this.getProcedures();
    }

}

updateProcedure(idProcedure: number){
  this.router.navigate(['admin/update-procedures/idProcedure', idProcedure]);
} 
}
