import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateurs } from './utilisateurs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUtilisateurs(): Observable <Utilisateurs[]>{
    return this.http.get<Utilisateurs[]>(`${this.apiUrl}/api/utilisateurs/get`);
  }

  public addUtilisateurs(utilisateurs: Utilisateurs): Observable <Utilisateurs>{
    return this.http.post<Utilisateurs>(`${this.apiUrl}/api/utilisateurs/post`, utilisateurs);
  }

  /*public updateUtilisateurs(utilisateursId: number): Observable <Utilisateurs>{
    return this.http.put<Utilisateurs>(`${this.apiUrl}/api/utilisateurs/${utilisateursId}/put`, utilisateursId);
  }*/ //Le vrai

   updateUtilisateurs(id: number, utilisateurs: Utilisateurs): Observable<Object>{
    return this.http.put(`${this.apiUrl}/api/utilisateurs/${id}/put`, utilisateurs);
  }

  getUtilisateursById(id: number): Observable<Utilisateurs>{
    return this.http.get<Utilisateurs>(`${this.apiUrl}/api/utilisateurs/${id}/get`);
  }

  getTechnicienInfoByNom(nom: string): Observable<Utilisateurs> {
    return this.http.get<Utilisateurs>(`${this.apiUrl}/api/utilisateurs/{nom}`);
  }
  

  public deleteUtilisateurs(utilisateursId: number): Observable <void>{
    return this.http.delete<void>(`${this.apiUrl}/api/utilisateurs/${utilisateursId}/delete`);
  }

  me(token:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token 
      // Replace with your actual authorization token
    });
    return this.http.post("http://localhost:8080/api/v1/auth/me",{},{headers})
  
  }


}
