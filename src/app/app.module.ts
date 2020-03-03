import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';

import { ActivosComponent } from './activos/activos.component';
import {ActivoService} from './activos/activo.service';
import {RouterModule, Routes} from '@angular/router';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScanerComponent } from './scaner/scaner.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import { HistoricoComponent } from './historico/historico.component';
import {CalendarModule} from 'primeng/calendar';



const routes: Routes = [


  {path: 'activos', component: ActivosComponent},
  {path: 'scan', component: ScanerComponent},
  {path: 'historico', component: HistoricoComponent},



];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    ActivosComponent,
    ScanerComponent,
    HistoricoComponent,




  ],
  imports: [
    BrowserModule,   BrowserAnimationsModule, RouterModule.forRoot(routes),
    TableModule, FormsModule, DialogModule, MultiSelectModule,CalendarModule,
    HttpClientModule],
  providers: [ActivoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
