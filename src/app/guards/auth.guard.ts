import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router, private toast : NotificationService){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.toast.showError('Please Login first !')
      this.router.navigate(['login'])
      return false;
    }
  }

}
