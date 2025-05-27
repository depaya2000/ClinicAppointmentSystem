import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekarService } from '../service/lekar.service';
import { PacijentService } from '../service/pacijent.service';
import Lekar from '../models/lekar';
import Pacijent from '../models/pacijent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private lekarService: LekarService, private pacijentService: PacijentService) { }
  korisnickoIme: string = "";
  lozinka: string = "";
  greska: string;
  tip: string = "";
  brojLicence: string;
  specijalizacija: string;
  ogranak: string;
  prijava: boolean =false;

  lekari: Lekar[];

  trenutniKriterijumZaSortiranje: string = 'ime'; // Početni kriterijum za sortiranje
  opadajućiRedosled: boolean = false; // Početni redosled sortiranja

  imePretraga: string;
  prezimePretraga: string;
  specijalizacijaPretraga: string;
  pretragaLekari: Lekar[];
  role: string = null;

  ngOnInit(): void {

     // Provera da li je sesija istekla
     const sessionExpirationTime = sessionStorage.getItem('sessionExpirationTime');
     if (sessionExpirationTime && new Date().getTime() > parseInt(sessionExpirationTime, 10)) {
       // Sesija je istekla, preusmerite korisnika na stranicu za prijavu
       sessionStorage.clear();
       this.router.navigate(['']);
       return; // Dodajte povratnu naredbu da prekinete dalje izvršavanje koda
     }

     this.role = sessionStorage.getItem('role')

    this.lekarService.getAllDoctors().subscribe((l:Lekar[])=>{
      this.lekari=l;
      this.pretragaLekari = l;
    })
  }

  login() {
    if (this.korisnickoIme == "" || this.lozinka == "" || this.tip == "") {
      this.greska = "Niste uneli sve podatke!";
      return;
    }
    this.greska = "";
    if (this.tip == 'lekar') {
      this.lekarService.login(this.korisnickoIme, this.lozinka).subscribe((k: Lekar) => {
        if (k) {
          // Postavljanje vremena isteka sesije prilikom prijave
          const sessionTimeoutMinutes = 30; // Vreme isteka sesije u minutima
          const sessionTimeoutMilliseconds = sessionTimeoutMinutes * 60 * 1000; // Pretvaranje u milisekunde
          const sessionExpirationTime = new Date().getTime() + sessionTimeoutMilliseconds;
          sessionStorage.setItem('sessionExpirationTime', sessionExpirationTime.toString());
  
          sessionStorage.setItem("ulogovan", k.korisnickoIme);
          sessionStorage.setItem("role", "lekar");
          this.router.navigate(['lekar']);
        } else {
          this.greska = "Pogresno ste uneli korisnicko ime, lozinku ili tip korisnika!";
          return;
        }
      });
    } else {
      this.pacijentService.login(this.korisnickoIme, this.lozinka).subscribe((k: Pacijent) => {
        if (k) {
          // Postavljanje vremena isteka sesije prilikom prijave
          const sessionTimeoutMinutes = 60; // Vreme isteka sesije u minutima
          const sessionTimeoutMilliseconds = sessionTimeoutMinutes * 60 * 1000; // Pretvaranje u milisekunde
          const sessionExpirationTime = new Date().getTime() + sessionTimeoutMilliseconds;
          sessionStorage.setItem('sessionExpirationTime', sessionExpirationTime.toString());
  
          sessionStorage.setItem("ulogovan", k.korisnickoIme);
          sessionStorage.setItem("role", "pacijent");
          this.router.navigate(['pacijent']);
        } else {
          this.greska = "Pogresno ste uneli korisnicko ime, lozinku ili tip korisnika!";
          return;
        }
      });
    }
  }
  

  sortirajLekare(kriterijum: string) {
    // Promeni redosled sortiranja ako je isti kriterijum ponovno izabran
    if (this.trenutniKriterijumZaSortiranje === kriterijum) {
      this.opadajućiRedosled = !this.opadajućiRedosled;
    } else {
      this.opadajućiRedosled = false;
    }
  
    // Postavi trenutni kriterijum za sortiranje na izabrani kriterijum
    this.trenutniKriterijumZaSortiranje = kriterijum;
  
    // Sortiraj niz lekara na osnovu kriterijuma i redosleda
    this.pretragaLekari.sort((a, b) => {
      if (this.opadajućiRedosled) {
        return b[kriterijum].localeCompare(a[kriterijum]);
      } else {
        return a[kriterijum].localeCompare(b[kriterijum]);
      }
    });
  }

  pretraziLekare() {
    this.pretragaLekari = this.lekari.filter(lekar => {
      const imeUppercase = lekar.ime ? lekar.ime.toUpperCase() : '';
      const prezimeUppercase = lekar.prezime ? lekar.prezime.toUpperCase() : '';
      const specijalizacijaUppercase = lekar.specijalizacija ? lekar.specijalizacija.toUpperCase() : '';
  
      const zadovoljavaIme = this.imePretraga ? imeUppercase.includes(this.imePretraga.toUpperCase()) : true;
      const zadovoljavaPrezime = this.prezimePretraga ? prezimeUppercase.includes(this.prezimePretraga.toUpperCase()) : true;
      const zadovoljavaSpecijalizaciju = this.specijalizacijaPretraga ? specijalizacijaUppercase.includes(this.specijalizacijaPretraga.toUpperCase()) : true;
  
      return zadovoljavaIme && zadovoljavaPrezime && zadovoljavaSpecijalizaciju;
    });
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
    this.ngOnInit();
  }


}
