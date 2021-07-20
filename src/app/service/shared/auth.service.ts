import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public api_endpoint: string = this.baseUrl + 'auth/';

  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.api_endpoint + 'register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.api_endpoint + 'login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.api_endpoint + 'user-profile');
  }

  // Access user profile
  allUser(): Observable<any> {
    return this.http.get(this.api_endpoint + 'user/all');
  }

  // Delete User
  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.api_endpoint + 'user/'+id+'/delete');
  }

  // Get User data by ID
  getUser(id: any): Observable<any> {
    return this.http.get(this.api_endpoint + 'user/'+id);
  }

  // User registration
  updateUser(id: any, user: User): Observable<any> {
    return this.http.put(this.api_endpoint + 'user/'+id+'/update', user);
  }

  updateProfile(id: any, user: User): Observable<any> {
    return this.http.put(this.api_endpoint + 'user/'+id+'/update/profile', user);
  }

  //////
  refreshToken(): Observable<any> {
    return this.http.get(this.api_endpoint + 'refresh');
  }
}
