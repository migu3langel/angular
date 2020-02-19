import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Scanservice {

  constructor(private http: HttpClient) { }
  getScan() {
    return this.http.get<any>('http://localhost:9000/ia/api/scan')

  }
}
