import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chef } from 'src/app/chef';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public api_endpoint: string = this.baseUrl + 'chef/';

  // User registration
  upload(chef: Chef): Observable<any> {
    return this.http.post(this.api_endpoint + 'upload', chef);
  }

  // Get User data by ID
  getChefs(type: any): Observable<any> {
    return this.http.get(this.api_endpoint + 'get-chef/'+type);
  }

  updateChef(chef: Chef): Observable<any> {
    return this.http.put(this.api_endpoint + 'update', chef)
  }
}
