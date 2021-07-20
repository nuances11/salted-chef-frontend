import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/user';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  baseUrl = environment.baseUrl;

  // private userSubject?: BehaviorSubject<User>;
  private userSubject?: User;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  _isLoggedIn = false;
  userValue?: any;

  private issuer = {
    login: this.baseUrl + 'auth/login'
  }

  constructor(
    private authService: AuthService
  ) {

   }

  handleData(data: any){
    this.userValue = data;
    this.startRefreshTokenTimer();
    localStorage.setItem('auth_token', data.access_token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken(){
    const token = this.getToken();

    if(token){

      if (this.tokenExpired(token)) {
        return false;
      } else {
        const payload = this.payload(token);
        if(payload){
          return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
        }else{
          return false;
        }
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
    this.stopRefreshTokenTimer();
    if (this.userSubject) {
      this.userSubject = {};
    }

  }

  private tokenExpired(token: any) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  refreshToken() {
    return this.authService.refreshToken().subscribe( res => {
      this.startRefreshTokenTimer();
      if (this.userSubject) {
        console.log(res);
        this.userSubject = res;
      }

      return res;
    })
  }

  // helper methods

  private refreshTokenTimeout?: any;

  private startRefreshTokenTimer() {
      console.log('Check Token')

      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(this.userValue.access_token.split('.')[1]));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);

      this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }

}
