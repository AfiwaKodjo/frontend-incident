import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DarkModeToggleComponent } from "../../dark-mode-toggle/dark-mode-toggle.component";
import { MouvementMaterielsService } from 'src/app/pages/mouvement-materiels/mouvement-materiels.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    providers: [AuthService],
    styles: [],
    imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, MatSlideToggleModule, DarkModeToggleComponent]
})
export class HeaderComponent implements OnInit{
  router: any;
  nombreDemandesEnAttente: number = 0;
  mouvementMateriels: any[] = []

  ngOnInit(): void {
    this.getMouvementsEnAttente();
   /* setInterval(() => {
      this.getMouvementsEnAttente();
    }, 1000);*/
  }

  constructor(private authService: AuthService, private mouvementMaterielService: MouvementMaterielsService) { }

  toggle(){
    const element = document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }

  logout(): void {
    this.authService.logout()
      .subscribe(
        () => {
          // Déconnexion réussie
          console.log('c\'est bon')
          this.router.navigate([''])
          // Effectuez toute autre opération nécessaire après la déconnexion
        },
        error => {
          console.error(error);
          // Gérer les erreurs de déconnexion
        }
      );
  }


  getMouvementsEnAttente() {
    this.mouvementMaterielService.getMouvementMateriels().subscribe(
      (mouvementMateriels) => {
        this.nombreDemandesEnAttente = mouvementMateriels.filter(
          (mouvement) =>
            mouvement.libelleMouvement_Materiel === 'SORTIE' &&
            mouvement.statut === 'En attente de validation'
        ).length;
      }
    );
}

  
  }

