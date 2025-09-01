import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MaterielsService } from '../materiels.service';
import { Materiel } from '../materiel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-materiels',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,HttpClientModule],
  providers: [MaterielsService],
  template: `
   <div class="login-box">
  <h2>Mise à jour du matériel</h2>
  <form (ngSubmit)="onSubmit()">
  <div class="user-box" >
      <input type="number" name="idMateriel" id="idMateriel" required="" min="1" [(ngModel)]="materiel.idMateriel" >
      <label>Numéro</label>
    </div>
    <div class="user-box">
      <input type="text" name="nomMateriel" id="nomMateriel" required="" [(ngModel)]="materiel.nomMateriel">
      <label>Nom du matériel</label>
    </div>
    <div class="user-box">
      <input type="text" name="numeroSerie" id="numeroSerie" required="" [(ngModel)]="materiel.numeroSerie">
      <label>Numéro modèle</label>
    </div>
     <label style="color: #40E0D0;">Type hôte machine</label>
    <div class="user-box">
                        <select [(ngModel)]="materiel.typeMachine"  class="form-select" name="typeMachine">
                          <option [ngValue]="undefined">--Sélectionnez un type--</option>
                          <option>GAB</option>
                          <option>SERVEUR</option>
                          <option>IMPRIMANTE</option>
                        </select>
                        </div> <br>   

    <div class="user-box">
      <input type="text" name="identifiMachine" id="identifiMachine" required="" [(ngModel)]="materiel.identifiMachine">
      <label>Identifiant hôte machine</label>
    </div>
    <button class="btn btn-success" type="submit">Soumettre</button>
  </form>
</div>
  `,
  styles: [
    `
     html {
  height: 100%;
}
body {
  margin:0;
  padding:0;
  font-family: sans-serif;
  background: linear-gradient(#141e35, #243b55);

}

.login-box {
  position: absolute;
  top: 60%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #000;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03e9f4;
  color: #000000;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}


    
    `
  ]
})
export class UpdateMaterielsComponent implements OnInit{
  idMateriel!: number;
  materiel: Materiel = new Materiel();

  constructor(private materielService: MaterielsService, private route: ActivatedRoute, private router: Router){ }
  ngOnInit(): void {
    this.idMateriel =this.route.snapshot.params['idMateriel'];

    this.materielService.getMaterielById(this.idMateriel).subscribe(data => {
      console.log(data);
      this.materiel= data;  
    },
    error => console.log(error)
    );
    
  }

  onSubmit(){
    console.log(this.idMateriel);
    console.log(this.materiel);
    let materiel: any = {idMateriel: this.materiel.idMateriel, nomMateriel:this.materiel.nomMateriel,identifiMachine: this.materiel.identifiMachine, numeroSerie: this.materiel.numeroSerie, typeMachine: this.materiel.typeMachine, image: this.materiel.image}
    console.log(materiel);
    this.materielService.updateMateriel(this.idMateriel, materiel).subscribe(data =>{
      console.log(data);
      alert("Mise à jour réussie !! ") 
      this.goToMaterielList();
    },
    (error: HttpErrorResponse) => {
      if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur du serveur !! '
        });
        this.router.navigate(['/admin/materiels']);
      } else  if (error.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le matériel a été mis à jour !!'
        });
        this.router.navigate(['/admin/materiels']);
      }else 
      {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur !!'
        });
        this.router.navigate(['/admin/materiels']);
      }
    }

    
    )

  }

  goToMaterielList(){
    this.router.navigate(['/admin/materiels']);
  }

}
