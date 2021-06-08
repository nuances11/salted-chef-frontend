import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  _isLoggedIn = false;

  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login'
  }

  constructor() { }

  handleData(token: any){
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken(){
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
      }else{
        return false;
      }
    } else {
       return false;
    }
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    if (this.isValidToken()) {
      this._isLoggedIn = true;
    }
    // return this.isValidToken();
    return this._isLoggedIn;
  }

  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
  }

}
