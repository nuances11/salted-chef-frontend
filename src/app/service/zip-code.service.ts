import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Zipcode {
  data?: object;
}

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // getCode(zipcode: any, name: any): Observable<any>{
  //   return this.http.get(`${this.main_api}zipcode/get-code/${zipcode}/name/${name}`);
  // }

  getCode(data: Zipcode): Observable<any>{
    return this.http.post(`${this.baseUrl}zipcode/get-code`, data);
  }
}
