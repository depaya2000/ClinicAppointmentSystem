import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar';
import { Router } from '@angular/router';
import { DatePipe, Time } from '@angular/common';
import { LekarService } from '../service/lekar.service';
import { Pregled } from '../models/pregled';
import { Izvestaj } from '../models/izvestaj';
import { PacijentService } from '../service/pacijent.service';
import Pacijent from '../models/pacijent';
import { IzvestajService } from '../service/izvestaj.service';
import { ObavestenjeService } from '../service/obavestenje.service';

@Component({
  selector: 'app-pregledi-lekar',
  templateUrl: './pregledi-lekar.component.html',
  styleUrls: ['./pregledi-lekar.component.css']
})
export class PreglediLekarComponent implements OnInit {

  constructor(private router: Router,  private datePipe: DatePipe, private lekarService: LekarService, private pacijentService: PacijentService, private izvestajService: IzvestajService, private obavestenjeService: ObavestenjeService) { }

  ulogovan: Lekar
  noviIzvestaj: Izvestaj
  message: string;
  message1: string;
  showForm: boolean= false;
  pacijent: string;
  datum: Date;
  vreme: Time;
  lekar: string;
  specijalizacija: string;
  razlogDolaska: string;
  dijagnoza: string;
  terapija: string;
  datumKontrole: Date;

  naslovObavestenja: string;
  razlogOtkazivanja: string;

  ngOnInit(): void {

      
    const sessionExpirationTime = sessionStorage.getItem('sessionExpirationTime');
    if (sessionExpirationTime && new Date().getTime() > parseInt(sessionExpirationTime, 10)) {
      
      sessionStorage.clear(); 
      this.router.navigate(['']); 
      return; 
    }

    if (!sessionStorage.getItem('ulogovan') || sessionStorage.getItem('role') !== 'lekar') {
      
      this.router.navigate(['']);
    }
    
    this.lekarService.getDoctor(sessionStorage.getItem('ulogovan')).subscribe((p: Lekar)=>{
      this.ulogovan = p;
      console.log(p.zakazaniPregledi.length)
      this.lekar = this.ulogovan.korisnickoIme;
      this.specijalizacija = this.ulogovan.specijalizacija;
    })
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  sortirajPregledePoDatumu(pregledi: Pregled[]): Pregled[] {
    if (!pregledi) {
      return []; 
    }

    const filtriraniPregledi = pregledi.filter((pregled) =>
    this.isPregledProsao(pregled)==false
    )
    const sortiraniPregledi = filtriraniPregledi.sort((a, b) => {
      const dateA = new Date(`${a.datum.toString().slice(0, 10)}T${a.vreme}:00.000Z`);
      const dateB = new Date(`${b.datum.toString().slice(0, 10)}T${b.vreme}:00.000Z`);
      return dateA.getTime() - dateB.getTime();
    });
  
    return sortiraniPregledi.slice(0, 3);
  }

  zapamtiPacijenta(p){
    localStorage.setItem('pacijentKarton', p.pacijent)
    //console.log(p.pacijent)
  }

  isPregledProsao(pregled: Pregled): boolean {
    
    const trenutniDatumVreme = new Date();
    const datumBezVremena = pregled.datum.toString().slice(0, 10);
    const pregledDatumVreme = new Date(`${datumBezVremena}T${pregled.vreme}`);
    const pregledKrajVreme = new Date(pregledDatumVreme);
    pregledKrajVreme.setMinutes(pregledKrajVreme.getMinutes() + pregled.trajanje);
    //console.log(datumBezVremena)
    //console.log(typeof(pregled.datum))
    //console.log(pregledDatumVreme)
    //console.log(pregledKrajVreme)
    //console.log(pregled.trajanje)
  
    return ((pregledDatumVreme.getTime() <trenutniDatumVreme.getTime()) || (pregledDatumVreme.getTime()<=trenutniDatumVreme.getTime() && pregledKrajVreme.getTime()>=trenutniDatumVreme.getTime()))
  }

  dodajIzvestaj(p){
    console.log(new Date(`${p.datum}T${p.vreme}:00.000Z`))
    console.log(new Date(`${p.datum.toString().slice(0, 10)}T${p.vreme}:00.000Z`))
    console.log(p.datum)
    console.log(p.vreme)
    if(new Date(this.datumKontrole) > new Date()){
    this.izvestajService.dodajIzvestaj(p.pacijent, this.lekar, new Date(`${p.datum.toString().slice(0, 10)}T${p.vreme}:00.000Z`), this.dijagnoza, this.terapija, this.razlogDolaska, this.datumKontrole).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.lekarService.dodajIzvestaj(this.ulogovan.korisnickoIme, p.naziv, p.datum, p.vreme, p.pacijent).subscribe(m=>{
          if (m['message'] != 'OK') {
            alert("Greska")
          } else {
            p.showForm = false;
            p.imaIzvestaj = true;
            this.message="Uspesno ste dodali izvestaj"
            this.ngOnInit();
          }
        })
      }
    })
  } else{
    this.message="Kontrola mora biti u buducnosti"
  }
}


  posaljiObavestenje(p){
      this.obavestenjeService.dodajObavestenje(this.lekar, p.pacijent, this.naslovObavestenja, this.razlogOtkazivanja).subscribe(m=>{
        if (m['message'] != 'OK') {
          alert("Greska")
        } else {
          this.pacijentService.otkaziPregled(p.pacijent, this.lekar, p.naziv, p.datum, p.vreme).subscribe(m=>{
            if (m['message'] != 'OK') {
              alert("Greska")
            } else {
              this.lekarService.otkaziPregled(this.lekar, p.naziv, p.datum, p.vreme).subscribe(m=>{
                if (m['message'] != 'OK') {
                  alert("Greska")
                } else {
                  p.showForm1 = false;
                  this.message1="Uspesno ste poslali pacijentu obavestenje o otkazivanju pregleda."
                  this.ngOnInit();
                }
             })
          }
        })
      }
    })
  }
    

  prikaziUnosIzvestaja(p){
    //this.showForm = true;
    p.showForm = true;
    this.pacijentService.getUser(p.pacijent).subscribe((p: Pacijent)=>{
      this.pacijent=p.ime +" "+p.prezime;
    })
  }

  prikaziUnosObavestenja(p){
    //this.showForm = true;
    p.showForm1 = true;
    this.pacijentService.getUser(p.pacijent).subscribe((p: Pacijent)=>{
      this.pacijent=p.ime +" "+p.prezime;
    })
  }

 
  
  
}
