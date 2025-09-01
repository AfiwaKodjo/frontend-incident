import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletContext } from '@angular/router';
import { UtilisateursService } from 'src/app/pages/utilisateurs/utilisateurs.service';
import { Utilisateurs } from 'src/app/pages/utilisateurs/utilisateurs';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="col-xxl-4 col-md-6 px-1">
  <div class="card info-card sales-card grey-card rounded-lg"> <!-- Ajoutez la classe "rounded-lg" -->
    <div class="card-body attractive-card">
      <h5 class="card-title"><h2><b>{{ title }}</b></h2></h5>
      <div class="d-flex align-items-center">
        <div class="multi-user-icon rounded-circle d-flex align-items-center justify-content-center">
          <i class="bi bi-people"></i> <!-- Icône de plusieurs utilisateurs -->
        </div>
        <div class="ps-3">
          <h6>{{ count }}</h6>
        </div>
      </div>
    </div>
  </div>
</div>






  `,
  styles: [
    `
   .multi-user-icon {
  background-color: #000; /* Couleur de fond noire */
  color: #fff; /* Couleur de l'icône blanche */
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.grey-card {
  background-color: #ccc; /* Couleur de fond grise */
  border: none; /* Supprime la bordure */
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
}



    
    `
  ]
})
export class CardDetailsComponent implements OnInit{
  count: number = 0;
  utilisateurs: Utilisateurs[] = [];
  title = 'Techniciens';

  constructor(private utilisateursService: UtilisateursService){}
  ngOnInit(): void {
    this.utilisateursService.getUtilisateurs().subscribe(
      (utilisateurs: Utilisateurs[]) => {
        this.utilisateurs = utilisateurs;

        // Compter le nombre d'utilisateurs dont le rôle est TECHNICIEN
        this.count = utilisateurs.filter(user => user.role === 'TECHNICIEN').length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

  /*ngOnInit(): void {
    this.utilisateursService.getUtilisateurs().subscribe(
      (utilisateurs: Utilisateurs[]) => {
        const nombreUtilisateurs = utilisateurs.length; // Obtenir le nombre total d'utilisateurs
        this.title = `Utilisateurs`;
        this.count = nombreUtilisateurs; // Ajouter cette variable dans votre classe
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
    
  }*/
  /*getUtilisateurs(): void {
    this.utilisateursService.getUtilisateurs().subscribe(
      (utilisateurs: Utilisateurs[]) => {
        this.utilisateurs = utilisateurs;

        // Compter le nombre d'utilisateurs dont le rôle est TECHNICIEN
        this.count = utilisateurs.filter(user => user.role === 'TECHNICIEN').length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );*/
  }


 


