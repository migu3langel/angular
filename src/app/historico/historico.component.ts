import { Component, OnInit } from '@angular/core';
import { HistoricoService } from './historico.service';
import { Historico } from './historico';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  listHistorico: Historico[];
  cols: any[];
  exportColumns: any[];
  setHistorico() {
    const listHistorico = [];
    for ( const historico of this.listHistorico) {
      historico.activo = historico.activo.codigoActivo;
      listHistorico.push(historico);
    }
    return listHistorico;
  }
  constructor(private historicoService: HistoricoService) { }

  ngOnInit() {
    this.historicoService.getHistorico().subscribe(listHistorico => {
      this.listHistorico = listHistorico;
      listHistorico = this.setHistorico();
    });

    this.cols = [
      {field: 'activo', header: 'Codigo de Activo'},
      {field: 'custodioAnterior', header: 'Custodio Anterior'},
      {field: 'custodioNuevo', header: 'Custodio Nuevo'},
      {field: 'descripcionAnterior', header: 'Descripcion Anterior'},
      {field: 'descripcionNueva', header: 'Descripcion Nueva'},
      {field: 'fecha', header: 'Fecha'}

    ];
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

  }
  exportPdf() {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(1, 0);
        doc.autoTable(this.exportColumns, this.listHistorico);
        doc.save('primengTable.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listHistorico);
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

}
