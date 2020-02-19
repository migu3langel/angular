import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  constructor(private http: HttpClient) { }
  getActivos() {
    return this.http.get<any>('http://localhost:9000/ia/api/activos')
   
  }
}
