import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = 'https://localhost:7183/api/User/'

  constructor(private http : HttpClient) { }

  signUp(userObj:any){
    // return this.http.post<any>(`${this.baseUrl}register`,userObj)
    return this.http.post<any>(this.baseUrl + 'register', userObj);
  }

  logIn(loginObj:any){
    // return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
    return this.http.post<any>(this.baseUrl + 'authenticate', loginObj);
  }

}