import { Injectable } from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import {api_url} from './api-urls';

interface Token {
  exp: number;
  user : {
    role: string;
    id:string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = `${api_url}`;
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/auth/login`, {email, password})
  }

  logout() {
    this.http.post(`${this.api}/auth/logout`, {})
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }

  public isLoggedIn(): boolean {
    if(sessionStorage.getItem("token")){
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        return false;
      }
      return true;
    }else {
      return false;
    }
  }


  public getCurrentUserId(): number {
    return Number.parseInt(<string>sessionStorage.getItem("userId") || "-1");
  }

  public isTutor(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as Token;
      return decodedToken.user.role == 'tutor';
    }
    return false;
  }

  setSessionStorage(access_token: string) {
    const decodedToken = jwtDecode(access_token) as Token;
    sessionStorage.setItem("token", access_token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }
}
