import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Procedure } from '../../procedures/procedure';
import { ProceduresService } from '../../procedures/procedures.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-procedure-responsable',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ProceduresService],
  template: `
    <div class="login-box">
  <h2>Mise à jour de la procédure</h2>
  <form (ngSubmit)="onSubmit()">
  <div class="user-box" >
      <input type="number" name="idProcedure" id="idProcedure" required="" min="1" [(ngModel)]="procedure.idProcedure">
      <label>Numéro</label>
    </div>
    <div class="user-box">
      <input type="text" name="nomProcedure" id="nomProcedure" required="" [(ngModel)]="procedure.nomProcedure">
      <label>Nom de la procédure</label>
    </div>
    <label style="color: white; font-size: 16px;">Description de la procédure</label>
    <div class="user-box">
      <textarea name="libelleProcedure" id="libelleProcedure" min="1" rows="4" cols="42" placeholder="Décrivez la procédure" required="" [(ngModel)]="procedure.libelleProcedure" ></textarea>
    </div>
    <button class="btn btn-success" type="submit">Soumettre</button>
  </form>
</div>
  `,
  styles: [`
  
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
export class UpdateProcedureResponsableComponent implements OnInit{
  idProcedure!: number;
  procedure: Procedure = new Procedure();

  constructor(private procedureService: ProceduresService, private route: ActivatedRoute, private router: Router){ }
  ngOnInit(): void {
    this.idProcedure =this.route.snapshot.params['idProcedure'];

    this.procedureService.getProcedureById(this.idProcedure).subscribe(data => {
      console.log(data);
      this.procedure= data;  
    },
    error => console.log(error)
    );
  }

  onSubmit(){
    console.log(this.idProcedure);
    console.log(this.procedure);
    let procedure: any = {idProcedure: this.procedure.idProcedure, nomProcedure: this.procedure.nomProcedure, libelleProcedure: this.procedure.libelleProcedure}
    console.log(procedure);
    this.procedureService.updateProcedure(this.idProcedure, procedure).subscribe(data =>{
      console.log(data);
      alert("Mise à jour réussie !! ") 
      this.goToProcedureList();
    },
    (error: HttpErrorResponse) => {
      if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur du serveur !! '
        });
        this.router.navigate(['/responsable/proceduresResponsable']);
      } else  if (error.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La procédure a été mise à jour !!'
        });
        this.router.navigate(['/responsable/proceduresResponsable']);
      }else 
      {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur !!'
        });
        this.router.navigate(['/responsable/proceduresResponsable']);
      }
    }
    
    )

  }

  goToProcedureList(){
    this.router.navigate(['/responsable/proceduresResponsable']);
  }



}
