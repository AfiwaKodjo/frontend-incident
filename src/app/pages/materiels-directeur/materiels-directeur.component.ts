import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielsService } from '../materiels/materiels.service';
import { Materiel } from '../materiels/materiel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materiels-directeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
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
                <div><input type="search" (ngModelChange)="searchMateriels(key.value )" #key="ngModel" ngModel
                 class="form-control w-100" id="searchNom " placeholder="search materiel..." name="key"  required></div>
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
    </tr>
    
  </tbody>
</table>  
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
export class MaterielsDirecteurComponent implements OnInit{
  constructor(private materielsService: MaterielsService) { }


  public materiels: Materiel[] = [];
  ngOnInit(): void {
    this.getMateriels();
  }

  private getMateriels() {
    this.materielsService.getMateriels().subscribe(data => {
      this.materiels = data;
    });
  }

  public searchMateriels(key: string): void{
    console.log(key);
      const results: Materiel[] = [];
      for (const materiel of this.materiels){
        if(materiel.nomMateriel.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || materiel.procedure.utilisateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || materiel.procedure.utilisateur.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || materiel.procedure.nomProcedure.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || materiel.procedure.libelleProcedure.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(materiel);
        }
      } 
      this.materiels = results;
      if(results.length === 0 || !key){
        this.getMateriels();
      }

  }

}
