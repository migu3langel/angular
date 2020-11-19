import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scaner } from './Scaner';


@Injectable({
  providedIn: 'root'
})
export class Scanservice {

  private url = 'http://10.14.1.43:9000/ia/api/scan/fecha';
  constructor(private http: HttpClient) { }

  getScan(): Observable<Scaner[]> {
    return this.http.get<Scaner[]>('http://10.14.1.43:9000/ia/api/scan');

  }

  getfecha(fechaI,fechaf){
    return this.http.get<any[]>(this.url+'/' + fechaI + '/' + fechaf);

  }
}
