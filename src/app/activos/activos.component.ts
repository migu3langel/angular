import { Component, OnInit } from '@angular/core';
import {Activo} from './activo';
import {ActivoService} from './activo.service';




@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent implements OnInit {

  habilitar = true;

activos: Activo[];

  constructor(private activosService: ActivoService) {


   }


  ngOnInit() {


    this.activosService.getActivos().subscribe(

      activos => this.activos = activos

              );
  }

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;

  }

}
