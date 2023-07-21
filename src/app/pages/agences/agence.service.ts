import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agence } from './agence';
import { Client } from '../clients/client';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

private baseURL="http://localhost:8080/api/agences"
  constructor(private httpClient: HttpClient) { }

  getAgencesList(): Observable<Agence[]>{
    return this.httpClient.get<Agence[]>(`${this.baseURL}/get`);
  }

  createAgence(agence: Agence): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/post`, agence);
  }

  getClients():Observable<Client[]>{
    return this.httpClient.get<Client[]>(`http://localhost:8080/api/clients/get`);
  }

  getAgenceById(idAgence: number): Observable<Agence>{
    return this.httpClient.get<Agence>(`${this.baseURL}/${idAgence}/get`);
  }

  updateAgence(idAgence: number, agence: Agence): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idAgence}/put`, agence);
  }

  deleteAgence(idAgence: number): Observable<Object>{
  return this.httpClient.delete(`${this.baseURL}/${idAgence}/delete`);
  }

}
