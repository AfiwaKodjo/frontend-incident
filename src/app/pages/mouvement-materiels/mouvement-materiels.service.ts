import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MouvementMateriel } from './mouvement-materiel';
import { Observable } from 'rxjs';
import { Incident } from '../incident/incident';
import { Materiel } from '../materiels/materiel';
import { Procedure } from '../procedures/procedure';
import { Utilisateurs } from '../utilisateurs/update-utilisateurs/utilisateurs';

@Injectable({
  providedIn: 'root'
})
export class MouvementMaterielsService {

  constructor(private httpClient: HttpClient) { }

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

  createMouvementMateriels(mouvementMateriel: MouvementMateriel): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/post`, mouvementMateriel);
  }

  public deleteMouvementMateriel(idMouvement_Materiel: number): Observable <void>{
    return this.httpClient.delete<void>(`${this.baseURL}/${idMouvement_Materiel}/delete`)};
}
