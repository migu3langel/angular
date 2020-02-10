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
import { PruebasComponent } from './pruebas/pruebas.component';

const routes: Routes = [

  {path: 'directivas', component: DirectivaComponent},
  {path: 'activos', component: ActivosComponent},
  {path: 'pruebas', component: PruebasComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    BrowserAnimationsModule,
    ActivosComponent,
    PruebasComponent,

  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes)
  ],
  providers: [ActivoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
