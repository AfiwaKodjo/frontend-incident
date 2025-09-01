import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Incident } from '../incident';
import { IncidentsService } from '../incidents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-incident',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers:[IncidentsService],
  template: `
  <div class="login-box">
  <h2>Mise à jour de l'incident</h2>
  <form (ngSubmit)="onSubmit()">
  <div class="user-box" >
      <input type="number" name="idIncident" id="idIncident" required="" min="1" [(ngModel)]="incident.idIncident">
      <label>Numéro</label>
    </div>
    <div class="user-box">
      <input type="text" name="nomIncident" id="nomIncident" required="" [(ngModel)]="incident.nomIncident">
      <label>Nom de l'incident</label>
    </div>
    <label style="color: white; font-size: 16px;">Description de l'incident</label>
    <div class="user-box">

      <textarea name="descriptionIncident" id="descriptionIncident" min="1" rows="4" cols="56" placeholder="Décrivez l'incident" [(ngModel)]="incident.descriptionIncident" required="" ></textarea>

    </div>
    <div class="user-box">
      <input type="datetime-local" name="dateCreationIncident" id="dateCreationIncident" required="" [(ngModel)]="incident.dateCreationIncident">
      <label>Date de création de l'incident</label>
    </div>
    <div class="user-box">
      <input type="datetime-local" name="dateClotureIncident" id="dateClotureIncident" required="" [(ngModel)]="incident.dateClotureIncident">
      <label>Date de clôture de l'incident</label>
    </div>
    <label style="color: white; font-size: 16px;">Priorité de l'incident</label>
    <div class="user-box">
    <select class="form-select" name="prioriteIncident" [(ngModel)]="incident.prioriteIncident">
        <option [ngValue]="undefined">--Sélectionnez une priorité--</option>
        <option>Critique</option>
        <option>Haute</option>
        <option>Moyenne</option>
        <option>Basse</option>
    </select>
    </div>
    <br>
    <label style="color: white; font-size: 16px;">Statut de l'incident</label>
    <div class="user-box">
      <select  class="form-select" name="statutIncident" [(ngModel)]="incident.statutIncident">
          <option [ngValue]="undefined">--Sélectionnez un statut--</option>
          <option>Attente</option>
          <option>En_cours</option>
          <option>Terminé</option>
      </select>
    </div>
    <br>
    <label style="color: white; font-size: 16px;">Canal de l'incident</label>
    <div class="user-box">
      <select  class="form-select" name="canalIncident" [(ngModel)]="incident.canalIncident">
        <option [ngValue]="undefined">--Sélectionnez un canal--</option>
        <option>Mail</option>
        <option>Téléphone</option>
      </select>
    </div>
    <br>
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
  top: 80%;
  left: 50%;
  width: 500px;
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
export class UpdateIncidentComponent implements OnInit{
  idIncident!: number;
  incident: Incident = new Incident();

  constructor(private incidentService: IncidentsService, private route: ActivatedRoute, private router: Router){ }
  ngOnInit(): void {
    this.idIncident =this.route.snapshot.params['idIncident'];

    this.incidentService.getIncidentById(this.idIncident).subscribe(data => {
      console.log(data);
      this.incident= data;  
    },
    error => console.log(error)
    );
 
  }

  onSubmit(){
    console.log(this.idIncident);
    console.log(this.incident);
    let incident: any = {idIncident: this.incident.idIncident, nomIncident: this.incident.nomIncident,
      descriptionIncident: this.incident.descriptionIncident, dateCreationIncident: this.incident.dateCreationIncident,
      dateClotureIncident: this.incident.dateClotureIncident,prioriteIncident: this.incident.prioriteIncident, statutIncident: this.incident.statutIncident, canalIncident: this.incident.canalIncident,
      agence: {idAgence: this.incident.agence.idAgence, lieuAgence: this.incident.agence.lieuAgence, telephoneAgence: this.incident.agence.telephoneAgence, client:{idClient: this.incident.agence.client.idClient, nomClient: this.incident.agence.client.nomClient, adresseClient: this.incident.agence.client.adresseClient, contactClient: this.incident.agence.client.contactClient, emailClient: this.incident.agence.client.emailClient,
      utilisateur: {id: this.incident.agence.client.utilisateur.id, nom: this.incident.agence.client.utilisateur.nom, prenom: this.incident.agence.client.utilisateur.prenom, mot_de_passe: this.incident.agence.client.utilisateur.mot_de_passe, email: this.incident.agence.client.utilisateur.email, role: this.incident.agence.client.utilisateur.role}}},
      procedure: {idProcedure: this.incident.procedure.idProcedure, nomProcedure: this.incident.procedure.nomProcedure, libelleProcedure: this.incident.procedure.libelleProcedure},
    }
    console.log(incident);
    this.incidentService.updateIncident(this.idIncident,incident).subscribe(data =>{
      console.log(data);
      alert("Mise à jour réussie !! ") 
      this.goToIncidentList();
    },
    (error: HttpErrorResponse) => {
      if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur du serveur !! '
        });
        this.router.navigate(['/admin/incident']);
      } else  if (error.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'incident a été mis à jour !!'
        });
        this.router.navigate(['/admin/incident']);
      }else 
      {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur !!'
        });
        this.router.navigate(['/admin/incident']);
      }
    }
    
    )

  }

  goToIncidentList(){
    this.router.navigate(['/admin/incident']);
  }
  

}
