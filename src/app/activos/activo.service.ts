import { Injectable } from '@angular/core';
import {ACTIVOS} from './activos.json';
import {Activo} from './activo';
import {Observable, of} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  constructor() { }
  getActivos(): Observable<Activo[]> {
    return of(ACTIVOS);
  }
}
