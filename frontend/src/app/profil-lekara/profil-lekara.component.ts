import { Component, OnInit } from '@angular/core';
import { LekarService } from '../service/lekar.service';
import Lekar from '../models/lekar';
import { Pregled } from '../models/pregled';
import { Time } from '@angular/common';
import { Router } from '@angular/router';
import { PacijentService } from '../service/pacijent.service';

@Component({
  selector: 'app-profil-lekara',
  templateUrl: './profil-lekara.component.html',
  styleUrls: ['./profil-lekara.component.css']
})
export class ProfilLekaraComponent implements OnInit {

  constructor(private lekarService: LekarService, private router: Router, private pacijentService: PacijentService) { }

  lekar: Lekar
  izabraniPregled: string
  datumPregleda: Date
  vremePregleda: Time
  cenaPregleda: number
  trajanjePregleda: number
  message: string

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

    this.lekarService.getDoctor(localStorage.getItem('izabraniLekar')).subscribe((l: Lekar)=>{
      this.lekar = l;
    })
    
  
  }

  zakaziPregled(){

    let datumDostupan = true;

    const selectedDate = new Date(this.datumPregleda);


    this.lekar.sviPregledi.forEach((pregled) => {
    if (pregled.naziv === this.izabraniPregled) {
      this.cenaPregleda = pregled.cena;
      this.trajanjePregleda = pregled.trajanje;
    }
  });

  this.lekar.zakazaniPregledi.forEach((pregled) => {

    this.lekar.sviPregledi.forEach(p=>{
      if(p.naziv === pregled.naziv){
        pregled.trajanje = p.trajanje;
      }
    })

    const vecZakazaniPregled = new Date(pregled.datum.toString().slice(0,10))
   
   if (vecZakazaniPregled.getTime() === selectedDate.getTime()) {
    
    const pregledNoviPocetakVreme = new Date(`2023-01-01T${this.vremePregleda}`);
    const pregledNoviKrajVreme = new Date(`2023-01-01T${this.vremePregleda}`);
    const pregledPocetakVreme = new Date(`2023-01-01T${pregled.vreme}`);
    const pregledKrajVreme = new Date(`2023-01-01T${pregled.vreme}`);
    pregledKrajVreme.setMinutes(pregledKrajVreme.getMinutes() + pregled.trajanje);
    pregledNoviKrajVreme.setMinutes(pregledNoviKrajVreme.getMinutes() + this.trajanjePregleda);
  
    if (
      (pregledNoviPocetakVreme >= pregledPocetakVreme && pregledNoviPocetakVreme <= pregledKrajVreme) ||
      (pregledPocetakVreme >= pregledNoviPocetakVreme && pregledPocetakVreme <= pregledNoviKrajVreme) ||
      (pregledNoviKrajVreme >= pregledPocetakVreme && pregledNoviKrajVreme <= pregledKrajVreme) 
    ) {
      datumDostupan = false;
      return;
    }
    
  }
})

  if (datumDostupan) {
    if(new Date(`${this.datumPregleda}T${this.vremePregleda}`)> new Date()){
      
      this.pacijentService.zakaziPregled(sessionStorage.getItem('ulogovan'), this.lekar.korisnickoIme, this.izabraniPregled, selectedDate, this.vremePregleda).subscribe(m=>{
        if (m['message'] != 'OK') {
          alert("Greska")
        } else {
          this.ngOnInit();
          this.message="Uspesno ste zakazali pregled"
        }
      })

      this.lekarService.zakaziPregled(this.lekar.korisnickoIme, this.izabraniPregled, selectedDate, this.vremePregleda, sessionStorage.getItem('ulogovan')).subscribe(m=>{
        if (m['message'] != 'OK') {
          alert("Greska")
        } else {
          this.ngOnInit();
        }
      })
    }else{
      this.message="Ne mozete zakazati pregled za datum koji je prosao!";
    }

  } else {
    this.message="Termin je zauzet"
  }

  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

}
