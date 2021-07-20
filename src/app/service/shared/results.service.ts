import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  result?: any;
  constructor() { }

  setResult(data: any) {
    this.result = data;
  }

  getResult() {
    return this.result;
  }
}
