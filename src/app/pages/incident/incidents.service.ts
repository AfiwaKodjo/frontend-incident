import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from './incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/api/incidents";

  getIncidents():Observable<Incident[]>{
   return this.httpClient.get<Incident[]>(`${this.baseURL}/get`);
  }
}
