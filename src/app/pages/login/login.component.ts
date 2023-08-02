import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MesRoles } from 'src/app/mes-roles';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers:[ AuthService],
  template: `
    <main style="background-color: dodgerblue;">
    <div class="container">

<section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

        <div class="d-flex justify-content-center py-4">
          <a href="#" class="logo d-flex align-items-center w-auto">
            <img src="assets/img/logo2.png" alt="">
            <span class="d-none d-lg-block">GBS&S</span>
          </a>
        </div><!-- End Logo -->

        <div class="card mb-3">

          <div class="card-body">

            <div class="pt-4 pb-2">
              <h5 class="card-title text-center pb-0 fs-4">Connectez-vous</h5>
              <p class="text-center small">Continuez l'aventure avec nous !</p>
            </div>

            <form class="row g-3 " #myForm="ngForm" (ngSubmit)="login()">

              <div class="col-12">
                <label for="email" class="form-label">Email *</label>
                <div class="input-group has-validation">
                  <span class="input-group-text" id="inputGroupPrepend">@</span>
                  <input type="email" name="email" class="form-control" id="email" placeholder="pat@gmail.com" [(ngModel)]="email"  required email>                
                </div>
                <div *ngIf="myForm.controls['email'].errors?.['required']" style="color: red;">L'adresse e-mail est requise.</div>
                <div *ngIf="myForm.controls['email'].errors?.['email']" style="color: red;">L'adresse e-mail n'est pas valide.</div>
              </div>

              <div class="col-12">
                <label for="mot_de_passe" class="form-label">Mot de Passe *</label>
                <input type="password" name="mot_de_passe" class="form-control" id="mot_de_passe" [(ngModel)]="mot_de_passe" required maxlength="8" minlength="4">
                <div *ngIf="myForm.controls['mot_de_passe'].errors?.['required']" style="color: red;">Le mot de passe est requis.</div>
                <div *ngIf="myForm.controls['mot_de_passe'].errors?.['maxlength']" style="color: red;">Le mot de passe doit comporter au plus 8 caractères.</div>
                <div *ngIf="myForm.controls['mot_de_passe'].errors?.['minlength']" style="color: red;">Le mot de passe doit comporter au moins 4 caractères.</div>

              </div>

              <!--div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
              </div-->
              <div class="col-12">
                <button class="btn btn-primary w-100" type="submit">Connexion</button>
              </div>
              <div class="col-12">
                <p class="small mb-0">Vous n'avez pas de compte? <a routerLink="/register" >Identification</a></p>
              </div>
            </form>

          </div>
        </div>

        <!--div class="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div-->

      </div>
    </div>
  </div>

</section>

</div>
</main>
  `,
  styles: [
  ]
})
export class LoginComponent {
  email!: string;
  mot_de_passe!: string;
  myForm: any;

  constructor(private authService: AuthService, private router: Router) {}

  /*login(): void {
    this.authService.login(this.email, this.mot_de_passe)
      .subscribe(
        () => {
          alert('Connexion réussie !');
            this.router.navigate(['/admin']);
            this.router.navigate(['/technicien']);
          
          // Connexion réussie, utilisateur redirigé selon le rôle
        },
        error => {
          console.error(error);
          alert('Echec lors de la connexion. Patientez !');
          // Gérer les erreurs de connexion
        }
      );
  }*/
 /*login(): void {
    this.authService.login(this.email, this.mot_de_passe)
      .subscribe(
        (response) => {
          alert('Connexion réussie !');
          /*if (response.role == 'ADMIN') {
            this.router.navigate(['/admin']); // Redirection pour l'administrateur
          } else if (response.role == 'TECHNICIEN') {
            this.router.navigate(['/technicien']); // Redirection pour le technicien
          } else {
            // Redirection pour les autres rôles ou cas non gérés
            this.router.navigate(['']);
          }//this.router.navigate(['/admin']);
        },
        error => {
          console.error(error);
          alert('Echec lors de la connexion. Patientez !');
          // Gérer les erreurs de connexion
        }
      );
  }*/
  role!: MesRoles;
  login(): void {
    this.authService.login(this.email, this.mot_de_passe, this.role)
      .subscribe(
        (response) => {
          alert('Connexion réussie !');         
          let role = response.role;
          console.log(response)
          localStorage.setItem('token', response.token)
          this.authService.me(localStorage.getItem('token')!).subscribe(
            (response2:any)=>{
              localStorage.setItem('roles',JSON.stringify(response2.authorities))
              role = response2.authorities;
              role.forEach((role1:any) => {
                console.log(role1)
                if (role1.authority==='ROLE_ADMIN'){
                  this.router.navigate(['/admin/dashboard']);
                }else if(role1.authority==='ROLE_TECHNICIEN'){
                  this.router.navigate(['/technicien/dashboardTechnicien']);
                }else if(role1.authority==='ROLE_RESPONSABLE'){
                  this.router.navigate(['/responsable/dashboardResponsable'])
                }else if(role1.authority==='ROLE_DIRECTEUR'){
                  this.router.navigate(['/directeur/dashboardDirecteur'])
                }else
                {
                  console.log('merci')
                }
              });

            }
          )
         
        },
        error => {
          console.error(error);
          alert('Echec lors de la connexion. Revoyez les données saisies !');
          // Gérer les erreurs de connexion
        }
      );
  }



 /* login() {
    this.authService.login(this.email, this.mot_de_passe).subscribe(
      response => {
        // Enregistrez le jeton JWT dans le stockage local (localStorage)
        localStorage.setItem('token', response.token);
        alert('Connexion réussi !');
        // Redirigez l'utilisateur vers la page d'accueil ou une autre page
        this.router.navigate(['/admin']);
        // selon votre application
      },
      error => {
        console.error(error);
        alert('Echec lors de la connexion. Patientez !');
        // Gérez les erreurs de connexion
      }
    );*/

   

  }
  


