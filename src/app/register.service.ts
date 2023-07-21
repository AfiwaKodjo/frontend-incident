import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  private apiUrl = 'http://localhost:8080/api/v1/auth/register';

  constructor(private http: HttpClient) {}

  createRegister(register: any) {
    return this.http.post(this.apiUrl, register);
  }
}
