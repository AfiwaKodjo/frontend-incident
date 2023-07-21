import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materiel } from './materiel';
import { Observable } from 'rxjs';
import { Procedure } from '../procedures/procedure';

@Injectable({
  providedIn: 'root'
})
export class MaterielsService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/api/materiels";

  getMateriels():Observable<Materiel[]>{
   return this.httpClient.get<Materiel[]>(`${this.baseURL}/get`);
  }

  getProcedures():Observable<Procedure[]>{
    return this.httpClient.get<Procedure[]>(`http://localhost:8080/api/procedures/get`);
  }

  createMateriel(materiel: Materiel): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/post`, materiel);
  }

}
