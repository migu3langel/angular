import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpresaActivoService {

  constructor(private http: HttpClient) { }
  getEmpresas() {
    return this.http.get<any>('http://localhost:9000/ia/api/empresas')

  }




}
