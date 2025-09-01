import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Procedure } from '../procedures/procedure';
import { ProceduresService } from '../procedures/procedures.service';
import { Utilisateurs } from '../utilisateurs/utilisateurs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-procedures-directeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="section dashboard">
  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-12">
      <div class="row">
        <div class="pagetitle">
          <h1>Procédure</h1>
          <br>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
              <li class="breadcrumb-item active">Procédure</li>
            </ol>
          </nav>
        </div>
      </div>          
    </div>
  </div>
</section>

<div class="row">
        <div class="col-12 col-lg-3 mb-3 ml-auto">
        <!--div class="card">
          <div class="card-body">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#exampleModal" (click)="onOpenModal(null!, 'add')">Ajout utilisateur</button>
            </div>
            </div-->
            <hr class="my-1">
        
            <div class="text-center px-xl-3">
                <!--label>Filter par Nom:</label-->
                <div><input type="search" (ngModelChange)="searchProcedures(key.value )" #key="ngModel" ngModel
                 class="form-control w-100" id="searchNom " placeholder="RECHERCHE..." name="key"  required></div>
              </div>
             
            </div>
        </div>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <h2>Liste des procédures</h2>
   <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">Nom Procédure</th>
      <th scope="col">Description Procédure</th>
      <!-- <th scope="col">Acteur</th> -->
      <!-- <th scope="col">Rôle</th> -->
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let procedure of procedures">
      <td><h2>{{procedure.nomProcedure}}</h2></td>
      <td><h2>{{procedure.libelleProcedure}}</h2></td>
      <!-- <td><h2>{{procedure.utilisateur.nom}}</h2></td> -->
      <!-- <td><h2>{{procedure.utilisateur.role}}</h2></td> -->
    </tr>
    <tr>
  </tbody>
</table>


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
export class ProceduresDirecteurComponent implements OnInit{

  form: any = {};

  procedures: Procedure[] = [];

  idProcedure!: number;

  procedure: Procedure = new Procedure();

  utilisateurs: Utilisateurs[] = [];
  constructor(private proceduresService: ProceduresService) { }

  ngOnInit(): void {
    this.getProcedures();
    this.proceduresService.getUtilisateurs().subscribe(response => this.utilisateurs = response);

  }

  private getProcedures() {
    this.proceduresService.getProcedures().subscribe(data => {
      this.procedures = data;
    });
  }

  public searchProcedures(key: string): void{
    console.log(key);
      const results: Procedure[] = [];
      for (const procedure of this.procedures){
        if(procedure.nomProcedure.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || procedure.libelleProcedure.toLowerCase().indexOf(key.toLowerCase()) !== -1
        //|| procedure.utilisateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        //|| procedure.utilisateur.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ){
          results.push(procedure);
        }
      } 
      this.procedures = results;
      if(results.length === 0 || !key){
        this.getProcedures();
      }

  }


}
