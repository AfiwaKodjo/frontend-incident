import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsService } from '../../clients/clients.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../clients/client';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client-responsable',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [ClientsService],
  template: `
    <div class="login-box">
  <h2>Mise à jour du client</h2>
  <form (ngSubmit)="onSubmit()">
  <div class="user-box" >
      <input type="number" name="idClient" id="idClient" required="" min="1" [(ngModel)]="client.idClient">
      <label>Numéro</label>
    </div>
    <div class="user-box">
      <input type="text" name="nomClient" id="nomClient" required="" [(ngModel)]="client.nomClient" >
      <label>Nom du client</label>
    </div>
    <div class="user-box">
      <input type="text" name="adresseClient" id="adresseClient" required="" [(ngModel)]="client.adresseClient">
      <label>Adresse du client</label>
    </div>
    <div class="user-box">
      <input type="text" name="contactClient" id="contactClient"  required="" [(ngModel)]="client.contactClient">
      <label>Contact du client</label>
    </div>
    <div class="user-box">
      <input type="email" name="emailClient" id="emailClient"  required="" [(ngModel)]="client.emailClient">
      <label>Email du client</label>
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
export class UpdateClientResponsableComponent implements OnInit{
  idClient!: number;
  client: Client = new Client();

  constructor(private clientService: ClientsService, private route: ActivatedRoute, private router: Router){ }

  ngOnInit(): void {
    this.idClient =this.route.snapshot.params['idClient'];
    console.log(this.idClient);
    this.clientService.getClientById(this.idClient).subscribe(data => {
      console.log(data);
      this.client= data;  
    },
    error => console.log(error)
    );
  }

  onSubmit(){
    console.log(this.idClient);
    console.log(this.client);
    let client: any = {idClient: this.client.idClient, nomClient: this.client.nomClient, adresseClient: this.client.adresseClient, contactClient: this.client.contactClient, emailClient: this.client.emailClient, utilisateur: {id: this.client.utilisateur.id, nom: this.client.utilisateur.nom, prenom: this.client.utilisateur.prenom, email: this.client.utilisateur.email, mot_de_passe: this.client.utilisateur.mot_de_passe, role: this.client.utilisateur.role}}
    console.log(client);
    this.clientService.updateClient(this.idClient, client).subscribe(data =>{
      console.log(data);
      alert("Mise à jour réussie !! ") 
      this.goToClientList();
    },
    (error: HttpErrorResponse) => {
      if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur du serveur !!'
        });
        this.router.navigate(['/responsable/clientsResponsable']);
      } else  if (error.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le client a été mis à jour !!'
        });
        this.router.navigate(['/responsable/clientsResponsable']);
      }else 
      {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur !!'
        });
      this.router.navigate(['/responsable/clientsResponsable']);
      }
    }
    
    )

  }

  goToClientList(){
    this.router.navigate(['/responsable/clientsResponsable']);
  }
 

}
