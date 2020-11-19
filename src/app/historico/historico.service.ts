import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historico } from './historico';



@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor(private http: HttpClient) { }

  getHistorico(): Observable<Historico[]> {
    return this.http.get<Historico[]>('http://10.14.1.43:9000/ia/api/historico');

  }
}
