import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjetInterceptor implements HttpInterceptor {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  public_url= {
    login: `${this.apiUrl}/authenticate`,
    register: `http://localhost:8080/api/v1/auth/register`

  }

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!(request.url.includes(this.public_url.login) ||
    request.url.includes(this.public_url.register)
  )){
    const authToken = localStorage.getItem('token')!;
    console.log(authToken);
    //console.log('hello');
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }
    //console.log('hello2');
    return next.handle(request);
  }
}
