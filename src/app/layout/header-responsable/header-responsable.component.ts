import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MouvementMaterielsService } from 'src/app/pages/mouvement-materiels/mouvement-materiels.service';

@Component({
  selector: 'app-header-responsable',
  standalone: true,
  imports: [CommonModule,  HttpClientModule, RouterModule, FormsModule, MatSlideToggleModule],
  providers:[AuthService],
  template: `
    <header id="header" class="header fixed-top d-flex align-items-center">

<div class="d-flex align-items-center justify-content-between">
  <a href="index.html" class="logo d-flex align-items-center">
    <img src="assets/img/logo2.png" alt="">
    <span class="d-none d-lg-block">GBS&S</span>
  </a>
  <i class="bi bi-list toggle-sidebar-btn" (click)="toggle()"></i>
</div><!-- End Logo -->

<div class="search-bar">
  <form class="search-form d-flex align-items-center" method="POST" action="#">
    <input type="text" name="query" placeholder="Search" title="Enter search keyword">
    <button type="submit" title="Search"><i class="bi bi-search"></i></button>
  </form>
</div><!-- End Search Bar -->

<nav class="header-nav ms-auto">
  <ul class="d-flex align-items-center">

    <li class="nav-item d-block d-lg-none">
      <a class="nav-link nav-icon search-bar-toggle " href="#">
        <i class="bi bi-search"></i>
      </a>
    </li>

    <li class="nav-item dropdown">

      <a class="nav-link nav-icon" href="#" data-toggle="dropdown">
        <i class="bi bi-bell"></i>
        <span class="badge bg-primary badge-number"> {{nombreDemandesEnAttente }}</span>
      </a>

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li class="dropdown-header">
          
          <a [routerLink]="['/responsable/mouvement-materielsResponsable']"><span class="badge rounded-pill bg-primary p-2 ms-2">Voir tout</span></a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="notification-item">
          <i class="bi bi-exclamation-circle text-warning"></i>
          <div>
            <h4>Demandes en attente</h4>
            <p style="color: brown;">Nombres de demande de sortie:   {{nombreDemandesEnAttente }}</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider">
        </li>

        <li>

      </ul>

    </li>

    <!--li class="nav-item dropdown">

      <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i class="bi bi-chat-left-text"></i>
        <span class="badge bg-success badge-number">3</span>
      </a>

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li class="dropdown-header">
          You have 3 new messages
          <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="message-item">
          <a href="#">
            <img src="assets/img/messages-1.jpg" alt="" class="rounded-circle">
            <div>
              <h4>Maria Hudson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>4 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="message-item">
          <a href="#">
            <img src="assets/img/messages-2.jpg" alt="" class="rounded-circle">
            <div>
              <h4>Anna Nelson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>6 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="message-item">
          <a href="#">
            <img src="assets/img/messages-3.jpg" alt="" class="rounded-circle">
            <div>
              <h4>David Muldon</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>8 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="dropdown-footer">
          <a href="#">Show all messages</a>
        </li>

      </ul>

    </li-->

    <li class="nav-item dropdown pe-3">

      <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-toggle="dropdown">
        <img src="assets/img/utilisateur.png" alt="Profile" class="rounded-circle">
        <span class="d-none d-md-block dropdown-toggle ps-2">Responsable</span>
      </a><!-- End Profile Iamge Icon -->

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <i class="bi bi-box-arrow-right"></i>
            <span onclick="logout()">Deconnexion</span>
          </a>
        </li>

      </ul><!-- End Profile Dropdown Items -->
    </li><!-- End Profile Nav -->

  </ul>
</nav><!-- End Icons Navigation -->
</header>

  `,
  styles: [
  ]
})
export class HeaderResponsableComponent implements OnInit{
  router: any;
  nombreDemandesEnAttente: number = 0;
  mouvementMateriels: any[] = []
  constructor(private authService: AuthService, private mouvementMaterielService: MouvementMaterielsService) { }
  ngOnInit(): void {
    this.getMouvementsEnAttente();
   /* setInterval(() => {
      this.getMouvementsEnAttente();
    }, 1000);*/
  }
  toggle(){
    const element = document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }

  logout(): void {
    this.authService.logout()
      .subscribe(
        () => {
          // Déconnexion réussie
          alert('c\est bon')
          this.router.navigate([''])
          // Effectuez toute autre opération nécessaire après la déconnexion
        },
        error => {
          console.error(error);
          // Gérer les erreurs de déconnexion
        }
      );
  }



 /* getMouvementsEnAttente() {
    this.mouvementMaterielService.getMouvementMateriels().subscribe(
      (mouvementMateriels) => {
        this.nombreDemandesEnAttente = mouvementMateriels.filter(
          (mouvement) =>
            mouvement.libelleMouvement_Materiel === 'SORTIE' &&
            mouvement.statut === 'En attente de validation'
        ).length;
        this.getMouvementsEnAttente();
      }
    );
  }*/

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