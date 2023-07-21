import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielsService } from './materiels.service';
import { Materiel } from './materiel';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Procedure } from '../procedures/procedure';

@Component({
  selector: 'app-materiels',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [MaterielsService],
  template: `
  <div class="row">
        <div class="col-12 col-lg-3 mb-3 ms-auto">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Ajout matériel</button>
            </div>
        </div>
        </div>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <h2>Liste des matériels utilisés</h2>
   <table class="table caption-top">
  <thead class="table-dark">
    <tr>
      <th scope="col">Nom du matériel</th>
      <th scope="col">Quantité du matériel</th>
      <th scope="col">Nom de l'agent</th>
      <th scope="col">Prénom de l'agent</th>
      <th scope="col">Nom de la procédure</th>
      <th scope="col">Libellé procédure</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let materiel of materiels">
      <td><h3>{{materiel.nomMateriel}}</h3></td>
      <td><h3>{{materiel.quantiteMateriel}}</h3></td>
      <td><h3>{{materiel.procedure.utilisateur.nom}}</h3></td>
      <td><h3>{{materiel.procedure.utilisateur.prenom}}</h3></td>
      <td><h3>{{materiel.procedure.nomProcedure}}</h3></td>
      <td><h3>{{materiel.procedure.libelleProcedure}}</h3></td>
      <td>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" ><i class="fa fa-edit" style="color: royalblue;"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"><i class="fa fa-trash" style="color: red;"></i> </button>
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
                          <label>Insérez un chiffre</label>
                          <input class="form-control" type="number" name="idMateriel" id="idMateriel" min="1" placeholder="Chiffre" [(ngModel)]="materiel.idMateriel">
                      </div>
                      <br>
                        <div class="form-group">
                          <label>Nom du matériel</label>
                          <input class="form-control" type="text" name="nomMateriel" placeholder="Nom matériel" id="nomMateriel" [(ngModel)]="materiel.nomMateriel">
                        </div>
                        <br>
                        <div class="form-group">
                          <label>Quantité du matériel</label>
                          <input class="form-control" type="number" name="quantiteMateriel" placeholder="Quantité" id="quantiteMateriel" min="0" [(ngModel)]="materiel.quantiteMateriel">
                          <h3><b>Procédure</b></h3>
                        <div class="form-group">
                          <label for="procedure">Procédure</label>
                          <select class="form-control" name="procedure" [(ngModel)]="materiel.procedure">
                            <option [ngValue]="undefined">--Sélectionnez une procédure--</option>
                            <option *ngFor="let procedure of procedure" [ngValue]="procedure">{{procedure.nomProcedure}}</option>
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

  constructor(private materielsService: MaterielsService) { }


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

  onSubmit(){ 
    console.log(this.materiel);
    let materielModel: any = {idMateriel: this.materiel.idMateriel, nomMateriel:this.materiel.nomMateriel, quantiteMateriel: this.materiel.quantiteMateriel, procedure:{idProcedure: this.materiel.procedure.idProcedure, nomProcedure: this.materiel.procedure.nomProcedure, libelleProcedure:this.materiel.procedure.libelleProcedure, utilisateur: {id: this.materiel.procedure.utilisateur.id, nom: this.materiel.procedure.utilisateur.nom, prenom: this.materiel.procedure.utilisateur.prenom, email:this.materiel.procedure.utilisateur.email, mot_de_passe: this.materiel.procedure.utilisateur.mot_de_passe, role: this.materiel.procedure.utilisateur.role }}}
    console.log(materielModel)
   this.materielsService.createMateriel(materielModel).subscribe(data =>{
      console.log(data);
      this.getMateriels();
    },
    error => console.log(error)
    )

    }

}
