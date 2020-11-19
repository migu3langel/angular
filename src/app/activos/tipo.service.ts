import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TipoService {
  constructor(private httpClient: HttpClient) { }

    getTipo() {
      return this.httpClient.get<any>('http://10.14.1.43:9000/ia/api/tipo');
    }



}
