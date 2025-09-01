import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncidentComponent } from './pages/incident/incident.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { AuthGuard } from './auth-guard.guard';
import { TechGuard } from './tech-guard.guard';
import { ResponsableComponent } from './responsable/responsable.component';
import { DirecteurComponent } from './directeur/directeur.component';
import { ResponsableGuard } from './responsable-guard.guard';
import { DirecteurGuard } from './directeur-guard.guard';
import { IncidentResponsableComponent } from './pages/incident-responsable/incident-responsable.component';
import { DashboardResponsableComponent } from './pages/dashboard-responsable/dashboard-responsable.component';
import { DashboardDirecteurComponent } from './pages/dashboard-directeur/dashboard-directeur.component';
import { IncidentDirecteurComponent } from './pages/incident-directeur/incident-directeur.component';
import { DashboardTechnicienComponent } from './pages/dashboard-technicien/dashboard-technicien.component';
import { IncidentTechnicienComponent } from './pages/incident-technicien/incident-technicien.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { MaterielsComponent } from './pages/materiels/materiels.component';
import { AgencesComponent } from './pages/agences/agences.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { UpdateUtilisateursComponent } from './pages/utilisateurs/update-utilisateurs/update-utilisateurs.component';
import { UpdateAgencesComponent } from './pages/agences/update-agences/update-agences.component';
import { ProceduresComponent } from './pages/procedures/procedures.component';
import { MouvementMaterielsComponent } from './pages/mouvement-materiels/mouvement-materiels.component';
import { ProceduresDirecteurComponent } from './pages/procedures-directeur/procedures-directeur.component';
import { MaterielsDirecteurComponent } from './pages/materiels-directeur/materiels-directeur.component';
import { MaterielsTechnicienComponent } from './pages/materiels-technicien/materiels-technicien.component';
import { ProceduresTechnicienComponent } from './pages/procedures-technicien/procedures-technicien.component';
import { IncidentDetailsComponent } from './pages/incident/incident-details/incident-details.component';
import { UpdateClientsComponent } from './pages/clients/update-clients/update-clients.component';
import { UpdateIncidentComponent } from './pages/incident/update-incident/update-incident.component';
import { UpdateMouvementMaterielsComponent } from './pages/mouvement-materiels/update-mouvement-materiels/update-mouvement-materiels.component';
import { UpdateMaterielsComponent } from './pages/materiels/update-materiels/update-materiels.component';
import { UpdateProceduresComponent } from './pages/procedures/update-procedures/update-procedures.component';
import { UpdateIncidentTechnicienComponent } from './pages/incident-technicien/update-incident-technicien/update-incident-technicien.component';
import { UpdateProcedureTechnicienComponent } from './pages/procedures-technicien/update-procedure-technicien/update-procedure-technicien.component';
import { MaterielsResponsableComponent } from './pages/materiels-responsable/materiels-responsable.component';
import { ProceduresResponsableComponent } from './pages/procedures-responsable/procedures-responsable.component';
import { ClientsResponsableComponent } from './pages/clients-responsable/clients-responsable.component';
import { AgencesResponsableComponent } from './pages/agences-responsable/agences-responsable.component';
import { MouvementMaterielsResponsableComponent } from './pages/mouvement-materiels-responsable/mouvement-materiels-responsable.component';
import { UpdateIncidentResponsableComponent } from './pages/incident-responsable/update-incident-responsable/update-incident-responsable.component';
import { UpdateMaterietResponsableComponent } from './pages/materiels-responsable/update-materiet-responsable/update-materiet-responsable.component';
import { UpdateMouvementResponsableComponent } from './pages/mouvement-materiels-responsable/update-mouvement-responsable/update-mouvement-responsable.component';
import { UpdateAgenceResponsableComponent } from './pages/agences-responsable/update-agence-responsable/update-agence-responsable.component';
import { UpdateClientResponsableComponent } from './pages/clients-responsable/update-client-responsable/update-client-responsable.component';
import { UpdateProcedureResponsableComponent } from './pages/procedures-responsable/update-procedure-responsable/update-procedure-responsable.component';
import { IncidentDetailsTechnicienComponent } from './pages/incident-technicien/incident-details-technicien/incident-details-technicien.component';
import { IncidentResponsableDetailsComponent } from './pages/incident-responsable/incident-responsable-details/incident-responsable-details.component';


const routes: Routes = [
 {
    
    path: 'admin',
    component: AdminComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent,
 
    },
    {
        path: 'incident',
        component: IncidentComponent,
    },
    {
      path: 'utilisateurs',
      component: UtilisateursComponent,
    },
    {
    path: 'materiels',
    component: MaterielsComponent,
    },
    {
      path: 'agences',
      component: AgencesComponent,
    },
    {
        path: 'clients',
        component: ClientsComponent,
    },
    {
      path: 'update-utilisateurs/id/:id',
      component: UpdateUtilisateursComponent,
    },

    {
      path: 'update-agences/idAgence/:idAgence',
      component: UpdateAgencesComponent,
    },
    {
      path: 'procedures',
      component: ProceduresComponent,
    },
    {
      path: 'mouvement-materiels',
      component: MouvementMaterielsComponent,
    },

    { path: 'incident-details/:idIncident',
      component: IncidentDetailsComponent
    },
    {
      path: 'update-clients/idClient/:idClient',
      component: UpdateClientsComponent,
    },
    {
      path: 'update-incidents/idIncident/:idIncident',
      component: UpdateIncidentComponent,
    },
    {
      path: 'update-mouvements/idMouvement_Materiel/:idMouvement_Materiel',
      component: UpdateMouvementMaterielsComponent,
    },
    {
      path: 'update-materiels/idMateriel/:idMateriel',
      component: UpdateMaterielsComponent,
    },
    {
      path: 'update-procedures/idProcedure/:idProcedure',
      component: UpdateProceduresComponent,
    },
  
    ]
},
/*{
  path: '',
  component: LoginComponent,
  children: [
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'incident',
          component: IncidentComponent
        }
      ]
    }
  ]},*/

{
  path: 'technicien',
  component: TechnicienComponent,
  canActivate: [TechGuard],
  children:[
    {
      path: 'dashboardTechnicien',
      component: DashboardTechnicienComponent,
  },

  {
      path: 'incidentTechnicien',
      component: IncidentTechnicienComponent,
  },

  {
    path: 'materielsTechnicien',
    component: MaterielsTechnicienComponent,
  },

  {
    path: 'proceduresTechnicien',
    component: ProceduresTechnicienComponent,
  },
  {
    path: 'update-incidentTechnicien/idIncident/:idIncident',
    component: UpdateIncidentTechnicienComponent,
  },
  {
    path: 'update-procedureTechnicien/idProcedure/:idProcedure',
    component: UpdateProcedureTechnicienComponent,
  },

{ path: 'incident-details/:idIncident',
  component: IncidentDetailsTechnicienComponent
}, 

  ]
},
{
  path: 'register',
  component: RegisterComponent,
},
{
  path: '',
  component: LoginComponent,
},
{
  path: 'responsable',
  component: ResponsableComponent,
  canActivate: [ResponsableGuard],
  children:[
    {
      path: 'dashboardResponsable',
      component: DashboardResponsableComponent,

  },
  {
      path: 'incidentResponsable',
      component: IncidentResponsableComponent,
  },
  {
    path: 'materielsResponsable',
    component: MaterielsResponsableComponent,
  },
  {
  path: 'proceduresResponsable',
  component: ProceduresResponsableComponent,
  },
  {
    path: 'agencesResponsable',
    component: AgencesResponsableComponent,
  },
  {
      path: 'clientsResponsable',
      component: ClientsResponsableComponent,
  },
  {
    path: 'mouvement-materielsResponsable',
    component: MouvementMaterielsResponsableComponent,
  },  
  {
    path: 'update-incidentResponsable/idIncident/:idIncident',
    component: UpdateIncidentResponsableComponent
  },
  {
    path: 'update-materiels/idMateriel/:idMateriel',
    component: UpdateMaterietResponsableComponent,
  },
  {
    path: 'update-mouvements/idMouvement_Materiel/:idMouvement_Materiel',
    component: UpdateMouvementResponsableComponent,
  },
  {
    path: 'update-agences/idAgence/:idAgence',
    component: UpdateAgenceResponsableComponent,
  },
  {
    path: 'update-clients/idClient/:idClient',
    component: UpdateClientResponsableComponent,
  },
  {
    path: 'update-procedures/idProcedure/:idProcedure',
    component: UpdateProcedureResponsableComponent,
  },
{ path: 'incident-detailsResponsable/:idIncident',
  component: IncidentResponsableDetailsComponent
},
  
  ]

},
{
  path: 'directeur',
  component: DirecteurComponent,
  canActivate: [DirecteurGuard],
  children:[
      {
        path: 'dashboardDirecteur',
        component: DashboardDirecteurComponent,

      },
      {
          path: 'incidentDirecteur',
          component: IncidentDirecteurComponent,
      },
      {
        path: 'materielsDirecteur',
        component: MaterielsDirecteurComponent,
      },
      {
      path: 'proceduresDirecteur',
      component: ProceduresDirecteurComponent,
      },

       

  ]

},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
