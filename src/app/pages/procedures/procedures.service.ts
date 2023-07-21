import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedure } from './procedure';
import { Utilisateurs } from '../utilisateurs/utilisateurs';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/api/procedures";

  getProcedures():Observable<Procedure[]>{
   return this.httpClient.get<Procedure[]>(`${this.baseURL}/get`);
  }

  getUtilisateurs():Observable<Utilisateurs[]>{
    return this.httpClient.get<Utilisateurs[]>(`http://localhost:8080/api/utilisateurs/get`);
  }

  createProcedure(procedure: Procedure): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/post`, procedure);
  }

  deleteProcedure(idProcedure: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idProcedure}/delete`);
    }
}
