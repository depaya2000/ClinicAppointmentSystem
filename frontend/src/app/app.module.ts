import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaMenadzeraComponent } from './prijava-menadzera/prijava-menadzera.component';
import { SviLekariComponent } from './svi-lekari/svi-lekari.component';
import { PreglediPacijentaComponent } from './pregledi-pacijenta/pregledi-pacijenta.component';
import { ProfilLekaraComponent } from './profil-lekara/profil-lekara.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { DatePipe } from '@angular/common';
import { PreglediLekarComponent } from './pregledi-lekar/pregledi-lekar.component';
import { RaznoComponent } from './razno/razno.component';
import { KartonPacijentaComponent } from './karton-pacijenta/karton-pacijenta.component';
import { RegistracijaLekarComponent } from './registracija-lekar/registracija-lekar.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { UrediComponent } from './uredi/uredi.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LekarComponent,
    PacijentComponent,
    MenadzerComponent,
    RegistracijaComponent,
    PrijavaMenadzeraComponent,
    SviLekariComponent,
    PreglediPacijentaComponent,
    ProfilLekaraComponent,
    PromenaLozinkeComponent,
    PreglediLekarComponent,
    RaznoComponent,
    KartonPacijentaComponent,
    RegistracijaLekarComponent,
    ZahteviComponent,
    UrediComponent,
    ObavestenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
