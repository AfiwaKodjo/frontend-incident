import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MouvementMateriel } from './mouvement-materiel';
import { Observable, tap } from 'rxjs';
import { Incident } from '../incident/incident';
import { Materiel } from '../materiels/materiel';
import { Procedure } from '../procedures/procedure';
import { Utilisateurs } from '../utilisateurs/update-utilisateurs/utilisateurs';
import { NotificationService } from 'src/app/notification.service';

@Injectable({
  providedIn: 'root'
})
export class MouvementMaterielsService {
  nombreDemandesEnAttente = 0;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

  private baseURL = "http://localhost:8080/api/mouvements";

  getMouvementMateriels():Observable<MouvementMateriel[]>{
   return this.httpClient.get<MouvementMateriel[]>(`${this.baseURL}/get`);
  }

  getIncidents():Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`http://localhost:8080/api/incidents/get`);
  }

  getProcedures():Observable<Procedure[]>{
    return this.httpClient.get<Procedure[]>(`http://localhost:8080/api/procedures/get`);
  }

  getUtilisateurs():Observable<Utilisateurs[]>{
    return this.httpClient.get<Utilisateurs[]>(`http://localhost:8080/api/utilisateurs/get`);
  }

  getMateriels():Observable<Materiel[]>{
    return this.httpClient.get<Materiel[]>(`http://localhost:8080/api/materiels/get`);
  }

  /*createMouvementMateriels(mouvementMateriel: MouvementMateriel): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/post`, mouvementMateriel);
  }*/


  createMouvementMateriels(mouvement: any): Observable<any> {
    if (mouvement.libelleMouvement_Materiel === 'SORTIE' && mouvement.statut === 'En attente de validation') {
      this.notificationService.showNotification('Demande de sortie en attente de validation');
      this.updateNombreDemandesEnAttente();
    }
    return this.httpClient.post<any>(`${this.baseURL}/post`, mouvement); // Appel de l'API pour ajouter le mouvement
  }

  getMouvementMaterielById(idMouvement_Materiel: number): Observable<MouvementMateriel>{
    return this.httpClient.get<MouvementMateriel>(`${this.baseURL}/${idMouvement_Materiel}/get`);
  }

  updateMouvementMateriel(idMouvement_Materiel: number, mouvementMateriel: MouvementMateriel): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idMouvement_Materiel}/put`, mouvementMateriel);
  }


  public deleteMouvementMateriel(idMouvement_Materiel: number): Observable <void>{
    return this.httpClient.delete<void>(`${this.baseURL}/${idMouvement_Materiel}/delete`)};

    validateSortie(idMouvement_Materiel: number) {
      const url = `http://localhost:8080/api/valider-sortie/${idMouvement_Materiel}`;
    
      return this.httpClient.post<string>(url, {});
    }

    updateNombreDemandesEnAttente(): void {
      this.nombreDemandesEnAttente++;
    }


    rejeterSortieMateriel(idMouvement_Materiel: number, motifRejet: string) {
      const url = `http://localhost:8080/api/${idMouvement_Materiel}/rejeter`;
    
      return this.httpClient.post<string>(url, motifRejet );
    }
    
    
}
