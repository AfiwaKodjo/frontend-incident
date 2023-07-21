import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MesRoles } from './mes-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';


  constructor(private http: HttpClient, private router: Router) {}

  /*login(email: string, mot_de_passe: string) {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { email, mot_de_passe });
  }*/

  private tokenKey = 'authToken';


  login(email: string, mot_de_passe: string, role: MesRoles): Observable<any> {
   
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { email, mot_de_passe })
      .pipe(
        tap(response => {
          // Vérifier le rôle de l'utilisateur dans la réponse
         const role = response.role;
          
          // Stocker le token JWT dans le stockage local
          const token = response.token;
         // localStorage.setItem(this.tokenKey, token);
          
          // Rediriger l'utilisateur en fonction du rôle
          if (role == 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (role == 'TECHNICIEN') {
            this.router.navigate(['/technicien']);
          }
        })
      );

  } //vrai

me(token:string){
 /* const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token 
    // Replace with your actual authorization token
  });*/
  return this.http.post("http://localhost:8080/api/v1/auth/me",{}/*,{headers}*/)

}


  /*login(email: string, mot_de_passe: string): Observable<any> {
    const loginData = {
      email,
      mot_de_passe
    };

    return this.http.post<any>(`${this.apiUrl}/authenticate`, loginData);
  }*/


  logout(): Observable<any> {
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }





  
}
