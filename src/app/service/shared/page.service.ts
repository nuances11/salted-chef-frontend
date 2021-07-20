import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  meta?: any;
  constructor() { }

  setMeta(data: any) {
    this.meta = data;
    console.log('setMeta', data);
  }

  getMeta() {
    return this.meta;
  }
}
