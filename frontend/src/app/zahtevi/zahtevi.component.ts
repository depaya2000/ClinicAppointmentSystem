import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZahtevRegistracijeService } from '../service/zahtev-registracije.service';
import ZahtevRegistracije from '../models/zahtevRegistracije';
import { PacijentService } from '../service/pacijent.service';
import { ZahteviVrstePregledaService } from '../service/zahtevi-vrste-pregleda.service';
import ZahtevVrstePregleda from '../models/zahtevVrstePregleda';
import { LekarService } from '../service/lekar.service';
import { VrstePregledaService } from '../service/vrste-pregleda.service';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.css']
})
export class ZahteviComponent implements OnInit {

  constructor(private router: Router, private zahtevRegistracijeService: ZahtevRegistracijeService, private vrstePregledaService: VrstePregledaService, private zahtevVrstePregledaService: ZahteviVrstePregledaService, private pacijentService: PacijentService) { }

  zahteviPacijenti: ZahtevRegistracije[];
  zahteviVrstePregleda: ZahtevVrstePregleda[];
  message: string;
  message1: string;

  ngOnInit(): void {

      const sessionExpirationTime = sessionStorage.getItem('sessionExpirationTime');
      if (sessionExpirationTime && new Date().getTime() > parseInt(sessionExpirationTime, 10)) {
        sessionStorage.clear();
        this.router.navigate(['']);
        return; 
      }

    if (!sessionStorage.getItem('ulogovan') || sessionStorage.getItem('role') !== 'menadzer') {  
      this.router.navigate(['']);
    }

    this.zahtevRegistracijeService.getAll().subscribe((z: ZahtevRegistracije[])=>{
      this.zahteviPacijenti = z;
    })

    this.zahtevVrstePregledaService.getAll().subscribe((z: ZahtevVrstePregleda[])=>{
      this.zahteviVrstePregleda = z;
      console.log(z.length)
    })

  }

  prihvatiZahtev(z){
    this.pacijentService.addUser(z.korisnickoIme, z.lozinka, z.ime, z.prezime, z.adresa, z.telefon, z.mejl, z.slika).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else{
        this.ngOnInit();
        this.message1="Pacijent je dodat u sistem";
      }
    })

    this.zahtevRegistracijeService.ukloniZahtev(z.korisnickoIme).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else{
        this.ngOnInit();
        this.message1="Pacijent je dodat u sistem";
      }
    })
  }

  odbijZahtev(z){
    this.zahtevRegistracijeService.odbijZahtev(z.korisnickoIme).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else{
        this.ngOnInit();
        this.message1="Pacijent je odbijen";
      }
    })
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  prihvatiZahtevPregleda(p){
    this.vrstePregledaService.dodajPregled(p.naziv, p.specijalizacija, p.cena, p.trajanje).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else{
        this.ngOnInit();
        this.message="Vrsta pregleda je dodata u sistem";
      }
    })

    this.zahtevVrstePregledaService.ukloniZahtev(p.naziv, p.lekar, p.specijalizacija).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else{
        this.ngOnInit();
        this.message="Vrsta pregleda je dodata u sistem";
      }
    })
  }

  odbijZahtevPregleda(p){
    this.zahtevVrstePregledaService.ukloniZahtev(p.naziv, p.lekar, p.specijalizacija).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else{
        this.ngOnInit();
        this.message="Vrsta pregleda je odbijena";
      }
    })
  }

}
