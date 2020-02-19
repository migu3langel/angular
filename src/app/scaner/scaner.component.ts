import { Component, OnInit } from '@angular/core';
import {Scanservice} from './scaner.service';
@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.css']
})
export class ScanerComponent implements OnInit {
scan: any[]
  constructor(private scanService: Scanservice) { }

  ngOnInit() {

    this.scanService.getScan().subscribe(scan => {
          this.scan = scan;
        }
    );
  }

}
