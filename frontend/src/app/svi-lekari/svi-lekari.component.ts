import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar';
import { LekarService } from '../service/lekar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-svi-lekari',
  templateUrl: './svi-lekari.component.html',
  styleUrls: ['./svi-lekari.component.css']
})
export class SviLekariComponent implements OnInit {

  constructor(private lekarService: LekarService, private router: Router) { }

  lekari: Lekar[];

  trenutniKriterijumZaSortiranje: string = 'ime'; // Početni kriterijum za sortiranje
  opadajućiRedosled: boolean = false; // Početni redosled sortiranja

  imePretraga: string;
  prezimePretraga: string;
  specijalizacijaPretraga: string;
  ogranakPretraga: string;
  pretragaLekari: Lekar[];

  ngOnInit(): void {

      const sessionExpirationTime = sessionStorage.getItem('sessionExpirationTime');
      if (sessionExpirationTime && new Date().getTime() > parseInt(sessionExpirationTime, 10)) {
        sessionStorage.clear();
        this.router.navigate(['']);
        return; 
      }

    if (!sessionStorage.getItem('ulogovan') || sessionStorage.getItem('role') !== 'pacijent') { 
      this.router.navigate(['']);
    }

    this.lekarService.getAllDoctors().subscribe((l:Lekar[])=>{
      this.lekari=l;
      this.pretragaLekari = l;
    })
  }

  sortirajLekare(kriterijum: string) {
    if (this.trenutniKriterijumZaSortiranje === kriterijum) {
      this.opadajućiRedosled = !this.opadajućiRedosled;
    } else {
      this.opadajućiRedosled = false;
    }
  
    this.trenutniKriterijumZaSortiranje = kriterijum;
  
    this.lekari.sort((a, b) => {
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
      const ogranakUppercase = lekar.ogranak ? lekar.ogranak.toUpperCase() : '';
  
      const zadovoljavaIme = this.imePretraga ? imeUppercase.includes(this.imePretraga.toUpperCase()) : true;
      const zadovoljavaPrezime = this.prezimePretraga ? prezimeUppercase.includes(this.prezimePretraga.toUpperCase()) : true;
      const zadovoljavaSpecijalizaciju = this.specijalizacijaPretraga ? specijalizacijaUppercase.includes(this.specijalizacijaPretraga.toUpperCase()) : true;
      const zadovoljavaOgranak = this.ogranakPretraga ? ogranakUppercase.includes(this.ogranakPretraga.toUpperCase()) : true;
  
      return zadovoljavaIme && zadovoljavaPrezime && zadovoljavaSpecijalizaciju && zadovoljavaOgranak;
    });
  }

  zapamtiLekara(p){
    localStorage.setItem('izabraniLekar', p.korisnickoIme)
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

}
