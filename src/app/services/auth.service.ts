import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7183/api/User/';

  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  signUp(userObj: any) {
    // return this.http.post<any>(`${this.baseUrl}register`,userObj)
    return this.http.post<any>(this.baseUrl + 'register', userObj);
  }

  logIn(loginObj: any) {
    // return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
    return this.http.post<any>(this.baseUrl + 'authenticate', loginObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload) return this.userPayload.name;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
