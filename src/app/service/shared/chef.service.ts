import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chef } from 'src/app/chef';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  constructor(private http: HttpClient) { }

  // User registration
  upload(chef: Chef): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/chef/upload', chef);
  }

  // Get User data by ID
  getChefs(type: any): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/chef/get-chef/'+type);
  }
}
