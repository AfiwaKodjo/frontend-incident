import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirecteurGuard implements CanActivate {
  constructor(private router:Router){}
  SECURITY_ROLES = {
    ADMIN: 'ROLE_ADMIN',
    TECHNICIEN: 'ROLE_TECHNICIEN',
    DIRECTEUR:'ROLE_DIRECTEUR',
    RESPONSABLE:'ROLE_RESPONSABLE'
    /*VALIDATEUR_PUBLICATION: 'ROLE_VALIDATEUR_PUBLICATION',
    VALIDATEUR_COMPTE: 'ROLE_VALIDATEUR_COMPTE',
    USER: 'ROLE_USER',*/
  
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userRoles = JSON.parse(localStorage.getItem('roles')!);
      console.log(userRoles)
      let bool = false
      if(userRoles){
        for (const userRole of userRoles) {
          if(userRole.authority == this.SECURITY_ROLES.DIRECTEUR ){
            bool = true
          }
        }
      }
      return bool? true:false;
    /* if(roleNumber==0){
      return this.router.parseUrl('/technicien')
     }else if(roleNumber == 1){
      console.log('oki')
      return this.router.parseUrl('/admin')
     }else {
      return true;
     }*/
      
}
        }