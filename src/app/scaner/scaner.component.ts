import { Component, OnInit } from '@angular/core';
import {Scanservice} from './scaner.service';
import {Scaner} from './Scaner';
import { DatePipe } from '@angular/common';
import { NuevoDto } from './NuevoDto';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.css']
})
export class ScanerComponent implements OnInit {
scan: Scaner[];
listDto: any[];
cols: any[];
exportColumns: any[];
scaner: any[];
loading: boolean;
totalRecords: number;
datasource: any;
selectedCar1: Scaner;
value: Date;
value2: Date;
es: any;

fecha: string;

getactivo() {

  const datePipe = new DatePipe('en-US');

  this.listDto = new Array();
  for (const s of this.scan) {
    const myFormattedDate = datePipe.transform(s.fechaScan, 'dd/MM/yyyy, hh:mm a');
    this.listDto.push(
      new NuevoDto(
        myFormattedDate,
        s.activo.codigoActivo,
        s.activo.custodio,
        s.activo.descripcion,
        s.loteActivo.estado,
        s.idScan));
}

}

setFecha(){

  const datePipe = new DatePipe('en-US');
  const myFormattedDate = datePipe.transform(this.value, 'dd-MM-yyyy');
  const Date2 = datePipe.transform(this.value2, 'dd-MM-yyyy');

  this.scanService.getfecha(myFormattedDate, Date2).subscribe(scan => {
   this.scan = scan;
   this.getactivo();
   this.datasource = this.listDto;
   this.totalRecords = this.datasource.length;
   console.log(myFormattedDate,Date2);

  }  );
}

  constructor(private scanService: Scanservice
    ) { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }


    this.scanService.getScan().subscribe(scan => {
      this.scan = scan;
      this.getactivo();
      this.datasource = this.listDto;
      this.totalRecords = this.datasource.length;
      console.log(this.totalRecords);

    }
      );


    this.cols = [
        {field: 'CodigoActivo', header: 'Código de activo'},
        {field: 'Fecha', header: 'Fecha de scan'},
        {field: 'Custodio', header: 'Custodio'},
        {field: 'Descripcion', header: 'Descripción'}

      ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
    this.loading = true;


  }
  exportPdf() {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(1, 0);
        doc.autoTable(this.exportColumns, this.listDto);
        doc.save('primengTable.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listDto);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'primengTable');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;


    setTimeout(() => {
        if (this.datasource) {
            this.listDto = this.datasource.slice(event.first, (event.first + event.rows));
            this.loading = false;
        }
    }, 1000);
}
}
