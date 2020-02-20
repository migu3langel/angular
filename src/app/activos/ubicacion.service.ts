import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UbicacionActivoService {
  constructor(private http: HttpClient) {}
  getUbicacion() {
    return this.http.get<any>('http://localhost:9000/ia/api/ubicacion');
  }
}
