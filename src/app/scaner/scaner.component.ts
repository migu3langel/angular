import { Component, OnInit } from '@angular/core';
import {Scanservice} from './scaner.service';
import {Scaner} from './Scaner';
import { DatePipe } from '@angular/common';
import { NuevoDto } from './NuevoDto';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.css']
})
export class ScanerComponent implements OnInit {
scan: Scaner[];
listDto: Array<any> = new Array();
cols: any[];
exportColumns: any[];

getactivo() {

  const datePipe = new DatePipe('en-US');
  let dto = [];

  for (let s of this.scan) {
    const myFormattedDate = datePipe.transform(s.fechaScan, 'M/d/yy, hh:mm');

       // (Fecha, CodigoActivo, Custodio, Descripcion, Lote)
       this.listDto.push(new NuevoDto(myFormattedDate,s.activo.codigoActivo,s.activo.custodio,s.activo.descripcion,s.loteActivo.estado));



}
  return dto;
}

  constructor(private scanService: Scanservice) { }

  ngOnInit() {

    this.scanService.getScan().subscribe(scan => {
      this.scan = scan;
      //this.listDto =
      this.getactivo();


    }
      );


      this.cols = [
        {field: "CodigoActivo", header: "Codigo de Activo"},
        {field:"Fecha", header:"Fecha de Scan"},
        {field:"Custodio", header:"Custodio"},
        {field:"Descripcion", header:"Descripcion"}



      ]

  this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }))

  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(1, 0);
        doc.autoTable(this.exportColumns, this.listDto);
        doc.save("primengTable.pdf");
      });
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listDto);
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

}
