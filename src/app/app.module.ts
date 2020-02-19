import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ActivosComponent } from './activos/activos.component';
import {ActivoService} from './activos/activo.service';
import {RouterModule, Routes} from '@angular/router';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {PanelModule} from 'primeng/panel';




const routes: Routes = [

  {path: 'directivas', component: DirectivaComponent},
  {path: 'activos', component: ActivosComponent},


];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ActivosComponent,
 
  
  ],
  imports: [
    BrowserModule,   BrowserAnimationsModule, RouterModule.forRoot(routes),
    TableModule, FormsModule,
    HttpClientModule],
  providers: [ActivoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
