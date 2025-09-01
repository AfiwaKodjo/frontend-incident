import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielsService } from 'src/app/pages/materiels/materiels.service';
import { Materiel } from 'src/app/pages/materiels/materiel';

@Component({
  selector: 'app-card-materiels',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="col-xxl-4 col-md-6 px-1">
  <div class="card info-card sales-card grey-card rounded-lg">
    <div class="card-body attractive-card">
      <h5 class="card-title" style="color: black;"><h2><b>Nombre de matériels à approvisionner</b></h2></h5>
      <div class="d-flex align-items-center">
        <div class="zero-quantity-icon rounded-circle d-flex align-items-center justify-content-center">
          <i class="bi bi-layers"></i> <!-- Icône de matériels -->
        </div>
        <div class="ps-3">
          <h6>{{ zeroQuantityMaterialsCount }}</h6>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`

/* Style pour l'icône de matériels */
.zero-quantity-icon {
  background-color: #000; /* Couleur de fond noire */
  color: #fff; /* Couleur de l'icône blanche */
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/* Style pour le card avec fond gris */
.grey-card {
  background-color: #ccc; /* Couleur de fond grise */
  border: none; /* Supprime la bordure */
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

/* Style pour le titre du card */
.card-title h2 b {
  font-size: 18px;
  color: #333; /* Couleur de texte */
  margin-bottom: 0;
}

/* Style pour le contenu du card */
.attractive-card {
  padding: 20px;
}

/* Style pour le nombre */
.ps-3 h6 {
  font-size: 24px;
  color: #000; /* Couleur de texte noire */
  margin-bottom: 0;
}

  
  
  `
  ]
})
export class CardMaterielsComponent implements OnInit{
  zeroQuantityMaterialsCount: number = 0;

  constructor(private materielsService: MaterielsService) {}

  ngOnInit(): void {
    this.getZeroQuantityMaterialsCount();
  }

  getZeroQuantityMaterialsCount() {
    this.materielsService.getMateriels().subscribe((materiels: Materiel[]) => {
      this.zeroQuantityMaterialsCount = materiels.filter(materiel => materiel.quantiteMateriel === 0).length;
    });
  }


}
