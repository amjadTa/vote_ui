import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router){}
  
   /**
   * check if the user is login in
   * allow to access the pages just if the user logined in
   */
  canActivate(): boolean | Observable<boolean> {
    const role = localStorage.getItem('role');
    if(role == 'admin' || role == 'update' || role == 'manager'){
      return true;
    }  
    alert('אין לך הרשאה לדף זה');
    return false;

  } // end canActivate()  
  
}
