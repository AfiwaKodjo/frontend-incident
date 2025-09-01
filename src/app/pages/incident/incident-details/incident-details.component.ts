import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incident } from '../incident';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../incidents.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentComponent } from '../incident.component';

@Component({
  selector: 'app-incident-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IncidentComponent],
  providers: [IncidentsService],
  template: `

<div class="row">
        <div class="col-12 col-lg-3 mb-3 ms-auto">
            <div class="text-center px-xl-3">
              <button class="btn btn-success btn-block no-print" type="button" (click)="imprimerPage()" ><i class="bi bi-box-arrow-in-down">Imprimer la page</i></button>
            </div>
        </div>
        </div>
<div style="background-color: grey;">
   <div class="container">
    <div class="row">
        <div class="col-xl-10 col-md-16" >
            <div class="card">
                <div class="card-block">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-auto">
                            <img class="img-fluid rounded-circle" style="width:70px;" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="dashboard-user">
                        </div>
                        <div class="col">
                            <h5><b>{{incident.agence?.client?.utilisateur?.nom}}</b></h5>
                            <span>{{incident.agence?.client?.utilisateur?.role}}</span>
                        </div>
                    </div>
                    <ul class="task-list">
                        <li>
                            <i class="task-icon bg-c-green"></i>
                            <h6>Nom de l'incident :<span class="float-right text-muted">Début : {{incident.dateCreationIncident}}</span></h6>
                            <span *ngIf="incident.dateClotureIncident" class="float-right text-muted">Fin: {{incident.dateClotureIncident}}</span>

                            <p class="text-muted">{{incident.nomIncident}}</p>
                        </li>
                        <li>
                            <i class="task-icon bg-c-green"></i>
                            <h6>Description de l'incident :</h6>
                            <p class="text-muted">{{incident.descriptionIncident}}</p>
                        </li>
                        <li>
                            <i class="task-icon bg-c-green"></i>
                            <h6>Nom de la procédure :</h6>
                            <p class="text-muted">{{incident.procedure?.nomProcedure}}</p>
                        </li>
                        <li>
                            <i class="task-icon bg-c-green"></i>
                            <h6>Description de la procédure utilisée :</h6>
                            <p class="text-muted">{{incident.procedure?.libelleProcedure}}</p>
                        </li>
                        
                        
                    </ul>
                   
                </div>
            </div>
        </div>
	</div>
</div>
</div>
  `,
  styles: [`
  
  body{
    margin-top:20px;
    background:#f1f1f1;
}

.task-list {
  list-style: none;
  position: relative;
  margin: 0;
  padding: 30px 0 0;
}
.task-list:after {
  content: "";
  position: absolute;
  background: #ecedef;
  height: 100%;
  width: 2px;
  top: 0;
  left: 30px;
  z-index: 1;
}
.task-list li {
  margin-bottom: 30px;
  padding-left: 55px;
  position: relative;
}
.task-list li:last-child {
  margin-bottom: 0;
}
.task-list li .task-icon {
  position: absolute;
  left: 22px;
  top: 13px;
  border-radius: 50%;
  padding: 2px;
  width: 17px;
  height: 17px;
  z-index: 2;
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
}



.card {
  border-radius: 0;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
          box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.card .card-header {
  background-color: transparent;
  border-bottom: 1px solid #f1f1f1;
  padding: 20px 25px;
  position: relative;
}
.card .card-header h5 {
  margin-bottom: 0;
  color: #000;
  font-size: 17px;
  font-weight: 400;
  display: inline-block;
  margin-right: 10px;
  line-height: 1.1;
  position: relative;
}
.card .card-header h5:after {
  content: "";
  background-color: #04a9f5;
  position: absolute;
  left: -25px;
  top: 0;
  width: 4px;
  height: 20px;
}
.card .card-header.borderless {
  border-bottom: none;
}
.card .card-header.borderless h5:after {
  display: none;
}
.card .card-header .card-header-right {
  right: 10px;
  top: 10px;
  display: inline-block;
  float: right;
  padding: 0;
  position: absolute;
}
@media only screen and (max-width: 575px) {
  .card .card-header .card-header-right {
    display: none;
  }
}
.card .card-header .card-header-right .dropdown-menu {
  margin-top: 0;
}
.card .card-header .card-header-right .dropdown-menu li a {
  font-size: 14px;
  text-transform: capitalize;
}
.card .card-header .card-header-right .btn.dropdown-toggle {
  border: none;
  background: transparent;
  -webkit-box-shadow: none;
          box-shadow: none;
  color: #888;
}
.card .card-header .card-header-right .btn.dropdown-toggle i {
  margin-right: 0;
}
.card .card-header .card-header-right .btn.dropdown-toggle:after {
  display: none;
}
.card .card-header .card-header-right .btn.dropdown-toggle:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
  outline: none;
}
.card .card-footer {
  border-top: 1px solid #f1f1f1;
  background: transparent;
  padding: 25px;
}
.card .card-block,
.card .card-body {
  padding: 30px 25px;
}
.card.card-load {
  position: relative;
  overflow: hidden;
}
.card.card-load .card-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
}
.card.card-load .card-loader i {
  margin: 0 auto;
  color: #04a9f5;
  font-size: 24px;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.card.full-card {
  z-index: 99999;
  border-radius: 0;
}

.bg-c-green {
    background: #1de9b6;
}

h6 {
    font-size: 14px;
}

@media print {
      .no-print {
        display: none;
      }
    }


/*nouveau*/

    /* Ajustements pour l'impression */
    @media print {
  body {
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
  
  .no-print {
    display: none;
  }
  
  .card {
    margin-bottom: 0;
    border: none;
    box-shadow: none;
  }
  
  /* En-tête d'impression */
  @page {
    margin: 1.5cm;
  }
  
  .print-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .print-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
  
  /* Pied de page d'impression */
  .print-footer {
    text-align: center;
    margin-top: 20px;
    color: #666;
  }
}

/* Styles supplémentaires pour améliorer l'apparence */
.container {
  background-color: grey;
  padding: 20px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card .card-block {
  padding: 20px;
}

.task-list li {
  position: relative;
  padding-left: 40px;
  margin-bottom: 20px;
}

.task-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #04a9f5;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}




  `
  ]
})
export class IncidentDetailsComponent implements OnInit {

  form: any = {};
   idIncident!: number;
   incident: Incident = new Incident;
  constructor(private route: ActivatedRoute, private incidentService: IncidentsService) { }

  ngOnInit(): void {
    this.idIncident =this.route.snapshot.params['idIncident'];

    this.incident= new Incident();
    this.incidentService.getIncidentById(this.idIncident).subscribe( data =>{
      this.incident=data;
    })

  }

  
  imprimerPage() {
    this.incidentService.printPage();
  }

}
