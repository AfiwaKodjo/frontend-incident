import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MouvementMateriel } from './mouvement-materiel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MouvementMaterielsService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/api/mouvements";

  getMouvementMateriels():Observable<MouvementMateriel[]>{
   return this.httpClient.get<MouvementMateriel[]>(`${this.baseURL}/get`);
  }
}
