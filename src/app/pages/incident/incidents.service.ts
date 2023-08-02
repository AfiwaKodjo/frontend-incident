import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from './incident';
import { Agence } from '../agences/agence';
import { Procedure } from '../procedures/procedure';
import { Client } from '../clients/client';
import { Utilisateurs } from '../utilisateurs/update-utilisateurs/utilisateurs';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/api/incidents";

  getIncidents():Observable<Incident[]>{
   return this.httpClient.get<Incident[]>(`${this.baseURL}/get`);
  }

  getAgences():Observable<Agence[]>{
    return this.httpClient.get<Agence[]>(`http://localhost:8080/api/agences/get`);
  }

  getClients():Observable<Client[]>{
    return this.httpClient.get<Client[]>(`http://localhost:8080/api/clients/get`);
  }

  getProcedures():Observable<Procedure[]>{
    return this.httpClient.get<Procedure[]>(`http://localhost:8080/api/procedures/get`);
  }

  getUtilisateurs():Observable<Utilisateurs[]>{
    return this.httpClient.get<Utilisateurs[]>(`http://localhost:8080/api/utilisateurs/get`);
  }

  createIncident(incident: Incident): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/post`, incident);
  }

  getIncidentById(idIncident: number): Observable<Incident>{
    return this.httpClient.get<Incident>(`${this.baseURL}/${idIncident}/get`);
  }

  public deleteIncident(idIncident: number): Observable <void>{
    return this.httpClient.delete<void>(`${this.baseURL}/${idIncident}/delete`);
  }

  printPage() {
    window.print();
  }

 /* deleteProcedure(idProcedure: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idProcedure}/delete`);
    }*/
}
