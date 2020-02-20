import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Activo} from './activo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ActivoService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {}
  getActivos() {
    return this.http.get<any>('http://localhost:9000/ia/api/activos');
  }

  create(activo: Activo) : Observable<Activo>{
    return this.http.post<Activo>('http://localhost:9000/ia/api/activo', activo, {headers: this.httpHeaders} );
  }
}
