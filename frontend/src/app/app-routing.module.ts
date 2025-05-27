import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaMenadzeraComponent } from './prijava-menadzera/prijava-menadzera.component';
import { SviLekariComponent } from './svi-lekari/svi-lekari.component';
import { PreglediPacijentaComponent } from './pregledi-pacijenta/pregledi-pacijenta.component';
import { ProfilLekaraComponent } from './profil-lekara/profil-lekara.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PreglediLekarComponent } from './pregledi-lekar/pregledi-lekar.component';
import { RaznoComponent } from './razno/razno.component';
import { KartonPacijentaComponent } from './karton-pacijenta/karton-pacijenta.component';
import { RegistracijaLekarComponent } from './registracija-lekar/registracija-lekar.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { UrediComponent } from './uredi/uredi.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lekar', component: LekarComponent },
  { path: 'pacijent', component: PacijentComponent },
  { path: 'menadzer', component: MenadzerComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijavaMenadzera', component: PrijavaMenadzeraComponent },
  { path: 'sviLekari', component: SviLekariComponent },
  { path: 'preglediPacijenta', component: PreglediPacijentaComponent },
  { path: 'profilLekara', component: ProfilLekaraComponent },
  { path: 'sviLekari/profilLekara', component: ProfilLekaraComponent },
  { path: 'promenaLozinke', component: PromenaLozinkeComponent },
  { path: 'preglediLekar', component: PreglediLekarComponent },
  { path: 'razno', component: RaznoComponent },
  { path: 'preglediLekar/kartonPacijenta', component: KartonPacijentaComponent },
  { path: 'registracijaLekar', component: RegistracijaLekarComponent },
  { path: 'zahtevi', component: ZahteviComponent },
  { path: 'uredi', component: UrediComponent },
  { path: 'obavestenja', component: ObavestenjaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

