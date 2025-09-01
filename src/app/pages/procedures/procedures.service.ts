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

  getProcedureById(idProcedure: number): Observable<Procedure>{
    return this.httpClient.get<Procedure>(`${this.baseURL}/${idProcedure}/get`);
  }

  
  updateProcedure(idProcedure: number, procedure: Procedure): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idProcedure}/put`, procedure);
  }

 public deleteProcedure(idProcedure: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/${idProcedure}/delete`);
    }
}
