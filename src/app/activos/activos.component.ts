import { Component, OnInit } from "@angular/core";
import { Activo } from './Activo';
import { ActivoService } from "./activo.service";
import { EmpresaActivoService } from "./EmpresaActivo.service";
import { UbicacionActivoService } from './ubicacion.service';
import { TipoService } from './tipo.service';
import swal from 'sweetalert2';
const Swal = require('sweetalert2');



@Component({
  selector: "app-activos",
  templateUrl: "./activos.component.html",
  styleUrls: ["./activos.component.css"]
})
export class ActivosComponent implements OnInit {
  habilitar = true;
  activos: any[];
  cols: any[];
  columns: any[];
  exportColumns: any[];
  display: boolean = false;
  empresas: any[];
  ubicacion: any[];
  tipos: any[];

  public saveActivo: Activo = new Activo();

  showDialog() {
    this.display = true;
  }

  getactivo() {
    let activos = [];
    for (let activo of this.activos) {
      activo.empresaActivo = activo.empresaActivo.descripcion;
      activo.tipoActivo = activo.tipoActivo.descripcion;
      activo.ubicacionActivo = activo.ubicacionActivo.descripcion;
      activos.push(activo);
    }
    return activos;
  }

  constructor(
    private activosService: ActivoService,
    private empresaActivo: EmpresaActivoService,
    private ubicacionActivo: UbicacionActivoService,
    private tipoActivo: TipoService,


  ) {}

  ngOnInit() {

    this.activosService.getActivos().subscribe(activos => {
      this.activos = activos;
      activos = this.getactivo();

      //  this.activos = getactivo();
    });

    this.empresaActivo
      .getEmpresas()
      .subscribe(empresas => (this.empresas = empresas));

    this.ubicacionActivo
      .getUbicacion()
      .subscribe(ubicacion =>(this.ubicacion = ubicacion));

    this.tipoActivo.getTipo().subscribe(tipos =>(this.tipos = tipos));



    this.cols = [
      { field: "codigoActivo", header: "Codigo de Activo" },
      { field: "custodio", header: "Custodio" },
      { field: "descripcion", header: "Descripcion" },
      { field: "empresaActivo", header: "Empresa " },
      { field: "tipoActivo", header: "Tipo de Activo" },
      { field: "ubicacionActivo", header: "Centro de Costo" }
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(1, 0);
        doc.autoTable(this.exportColumns, this.activos);
        doc.save("primengTable.pdf");
      });
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.activos);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  public create(): void {
    console.log("Clicked!");
    console.log(this.saveActivo);

    this.activosService.create(this.saveActivo).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'ACtivo actualizado',
          showConfirmButton: false,

        });


      }
    );
  }
}
