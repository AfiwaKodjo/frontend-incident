import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from 'src/app/register.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgIf, MatInputModule],
  providers:[ RegisterService],
  template: `
   <main style="background-color: dodgerblue;">
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="http://gbsands.com/" class="logo d-flex align-items-center w-auto">
                  <img src="assets/img/logo2.png" alt="">
                  <span class="d-none d-lg-block">GBS&S</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Inscrivez-vous</h5>
                    <p class="text-center small">Rejoignez-nous</p>
                  </div>

                  <form class="row g-3 needs-validation" #myForm="ngForm" (ngSubmit)="createRegister()">
                    <div class="col-12">
                      <label for="nom" class="form-label">Votre Nom </label>
                      <input type="text" name="nom" class="form-control" id="nom" [(ngModel)]="register.nom"  required>
                      <div *ngIf="myForm.controls['nom'].errors?.['required']" style="color: red;">Le nom d'utilisateur est requis.</div>
                    </div>

                    <div class="col-12">
                      <label for="prenom" class="form-label">Votre Prenom </label>
                      <input type="text" name="prenom" class="form-control" id="prenom" [(ngModel)]="register.prenom" required>
                      <div *ngIf="myForm.controls['prenom'].errors?.['required']" style="color: red;">Le prenom est requis.</div>              
                    </div>

                    <div class="col-12">
                      <label for="email" class="form-label">Votre Email </label>
                      <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                      <input type="email" name="email" class="form-control" id="email" [(ngModel)]="register.email" placeholder="pat@gmail.com" required email>
                    </div>
                    <div *ngIf="myForm.controls['email'].errors?.['required']" style="color: red;">L' adresse e-mail est requise.</div>
                    <div *ngIf="myForm.controls['email'].errors?.['email']" style="color: red;">L'adresse e-mail n'est pas valide.</div>
                    </div>
                    <!--mat-error *ngIf="email.invalid">{{getErrorMessage()}}</mat-error-->

                    <div class="col-12">
                      <label for="mot_de_passe" class="form-label">Votre Mot de Passe </label>
                      <input type="password" name="mot_de_passe" class="form-control" id="mot_de_passe" [(ngModel)]="register.mot_de_passe" required maxlength="8" minlength="4">
                      <div *ngIf="myForm.controls['mot_de_passe'].errors?.['required']" style="color: red;">Le mot de passe est requis.</div>
                      <div *ngIf="myForm.controls['mot_de_passe'].errors?.['maxlength']" style="color: red;">Le mot de passe doit comporter au plus 8 caractères.</div>
                      <div *ngIf="myForm.controls['mot_de_passe'].errors?.['minlength']" style="color: red;">Le mot de passe doit comporter au moins 4 caractères.</div>

                    </div>
                    <!--div class="col-12">
                      <label for="role" class="form-label">Votre Fonction *</label>
                      <select class="form-select" >
                      <option value="role" [(ngModel)]="register.role" id="role" name="role">Attente</option>
                      <input type="text" name="role" class="form-control" id="role"  required>      
                     </select>
                    </div-->

                    <!--div class="col-12">
                      <div class="form-check">
                        <input class="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required>
                        <label class="form-check-label" for="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                        <div class="invalid-feedback">You must agree before submitting.</div>
                      </div>
                    </div-->
                    <div class="col-12">
                      <button class="btn btn-primary w-100" (click)="checkIfUsernameEmpty()" type="submit">Inscription</button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">Avez-vous déjà un compte? <a routerLink="/" routerLinkActive="router-link-active" >Connexion</a></p>
                    </div>
                  </form>

                </div>
              </div>

              <!--div class="credits">
                Développé par <a href="http://gbsands.com/">GBS&S</a>
              </div-->

            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
  `,
  styles: [
    `.col-12 mat-error{
      margin-left: 8px;
    }`
  ]
})
export class RegisterComponent{
 nom!: string;
 prenom!: string;
 mot_de_passe!: string;
 email!: string;
 role!:string;

  register: any = {};
  myForm: any;

  checkIfUsernameEmpty() {
    if (!this.register.nom && !this.register.prenom && !this.register.mot_de_passe && !this.register.email && this.role) {
      console.log('Le champ est vide.');
    } /*else {
      console.log('Le champ n\'est pas vide.');
    }*/
  }

  constructor(private registerService: RegisterService) {}

  createRegister() {
   this.register = {...this.register, role:"ATTENTE"};
    console.log(this.register);
    this.registerService.createRegister(this.register).subscribe(
      response => {
        console.log(response);

        //alert('Enregistrement réussi !');

        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Inscription réussie !'
        });
        // Gérer la réponse du serveur après l'insertion réussie
      },
      error => {
        console.error(error);
        //alert('Echec lors de l\'enregistrement !');
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Echec lors de l\'enregistrement !'
        });
        // Gérer les erreurs d'insertion
      }
    );

   /* if (this.myForm.valid) {
      console.log(this.myForm.controls['nom']); 
      console.log(this.myForm.controls['prenom']); 
      console.log(this.myForm.controls['email']); 
      console.log(this.myForm.controls['mot_de_passe']);
      console.log(this.myForm.controls['role']);
      // Le formulaire est valide, traiter les données
    } else {
      (error: any) => {
        console.error(error);
        alert('Echec l\'enregistrement !');
        // Gérez les erreurs de connexion
      }
      // Le formulaire est invalide, afficher des messages d'erreur ou effectuer d'autres actions
    }*/
    
  }
  }
 /*email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer un mot de passe valide';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }*/



function customEmptyValidator(): any | string {
  throw new Error('Function not implemented.');
}




