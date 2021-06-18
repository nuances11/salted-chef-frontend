import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }

  // Access user profile
  allUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user/all');
  }

  // Delete User
  deleteUser(id: any): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/auth/user/'+id+'/delete');
  }

  // Get User data by ID
  getUser(id: any): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user/'+id);
  }

  // User registration
  updateUser(id: any, user: User): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/auth/user/'+id+'/update', user);
  }
}
