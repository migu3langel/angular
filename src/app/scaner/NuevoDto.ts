export class NuevoDto {
  Fecha: any;
  CodigoActivo: any;
  Custodio: any;
  Descripcion: any;
  Lote: any;
  id: any;
  constructor(Fecha, CodigoActivo, Custodio, Descripcion, Lote,id) {
    this.CodigoActivo = CodigoActivo;
    this.Custodio = Custodio;
    this.Fecha = Fecha;
    this.Lote = Lote;
    this.Descripcion = Descripcion;
    this.id = id;
  }
}
