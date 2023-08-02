import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable } from 'rxjs';
import { Utilisateurs } from '../utilisateurs/update-utilisateurs/utilisateurs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseURL = "http://localhost:8080/api/clients";

  constructor(private httpClient: HttpClient) { }

  getClients():Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.baseURL}/get`);
  }

  getUtilisateurs():Observable<Utilisateurs[]>{
    return this.httpClient.get<Utilisateurs[]>(`http://localhost:8080/api/utilisateurs/get`);
  }


  createClient(client: Client): Observable<Client>{
    return this.httpClient.post<Client>(`${this.baseURL}/post`, client);
  }


  getClientById(idClient: number): Observable<Client>{
    return this.httpClient.get<Client>(`${this.baseURL}/${idClient}/get`);
  }

 /* deleteClient(idClient: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idClient}/delete`);
    }*/

    public deleteClient(idClient: number): Observable <void>{
      return this.httpClient.delete<void>(`${this.baseURL}/${idClient}/delete`)};
  
}
