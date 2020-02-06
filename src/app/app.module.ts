import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ActivosComponent } from './activos/activos.component';
import {ActivoService} from './activos/activo.service';
import {RouterModule,Router} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ActivosComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [ActivoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
