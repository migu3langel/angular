import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scaner } from './Scaner';


@Injectable({
  providedIn: 'root'
})
export class Scanservice {

  constructor(private http: HttpClient) { }

  getScan(): Observable<Scaner[]> {
    return this.http.get<Scaner[]>('http://localhost:9000/ia/api/scan');

  }
}
