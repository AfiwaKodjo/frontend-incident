import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouvementMateriel } from './mouvement-materiel';
import { MouvementMaterielsService } from './mouvement-materiels.service';

@Component({
  selector: 'app-mouvement-materiels',
  standalone: true,
  imports: [CommonModule],
  providers: [MouvementMaterielsService],
  template: `
<div class="row">
        <div class="col-12 col-lg-3 mb-3 ms-auto">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal2" >Ajout mouvement-matériel</button>
            </div>
        </div>
        </div>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
   <table class="table">
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
      <td>{{mouvementMateriel.libelleMouvement_materiel}}</td>
      <td>{{mouvementMateriel.quantiteMouvement_materiel}}</td>
      <td>{{mouvementMateriel.incident.nomIncident}}</td>
      <td>{{mouvementMateriel.incident.canalIncident}}</td>
      <td>{{mouvementMateriel.materiel.nomMateriel}}</td>
      <td>{{mouvementMateriel.materiel.quantiteMateriel}}</td>
      <td>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0" ><i class="fa fa-edit" style="color: royalblue;"></i> </button>
            <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-0 mx-1"><i class="fa fa-trash" style="color: red;"></i> </button>
</td>
    </tr>
    <tr>
  </tbody>
</table>


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

  constructor(private mouvementMaterielsService: MouvementMaterielsService) { }
  ngOnInit(): void {
    this.getMouvementMateriels();
  }


  private getMouvementMateriels() {
    this.mouvementMaterielsService.getMouvementMateriels().subscribe(data => {
      this.mouvementMateriels = data;
    });
  }

}
