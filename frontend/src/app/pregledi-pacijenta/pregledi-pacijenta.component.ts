import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacijentService } from '../service/pacijent.service';
import Pacijent from '../models/pacijent';
import { DatePipe } from '@angular/common';
import { Izvestaj } from '../models/izvestaj';
import { Pregled } from '../models/pregled';
import { LekarService } from '../service/lekar.service';
import Lekar from '../models/lekar';
import { IzvestajService } from '../service/izvestaj.service';

@Component({
  selector: 'app-pregledi-pacijenta',
  templateUrl: './pregledi-pacijenta.component.html',
  styleUrls: ['./pregledi-pacijenta.component.css']
})
export class PreglediPacijentaComponent implements OnInit {

  constructor(private router: Router, private pacijentService: PacijentService, private datePipe: DatePipe, private lekarService: LekarService, private izvestajService: IzvestajService) { }

  ulogovan: Pacijent
  izvestaji: Izvestaj[];
  

  ngOnInit(): void {

        
    const sessionExpirationTime = sessionStorage.getItem('sessionExpirationTime');
    if (sessionExpirationTime && new Date().getTime() > parseInt(sessionExpirationTime, 10)) {
      
      sessionStorage.clear(); 
      this.router.navigate(['']); 
      return; 
    }

    if (!sessionStorage.getItem('ulogovan') || sessionStorage.getItem('role') !== 'pacijent') {  
      this.router.navigate(['']);
      return;
    }
  
    this.pacijentService.getUser(sessionStorage.getItem('ulogovan')).subscribe((p: Pacijent) => {
      this.ulogovan = p;

      this.ulogovan.zakazaniPregledi.forEach(pregled => {
        //pregled.datum = new Date(pregled.datum);
        //console.log(typeof(pregled.datum))
        this.lekarService.getDoctor(pregled.lekarUsername).subscribe((l: Lekar) => {
          pregled.ogranak = l.ogranak;
          pregled.lekar = l.ime+" "+l.prezime;
        });
      });
    });

    this.izvestajService.getUsersReports(sessionStorage.getItem("ulogovan")).subscribe((i: Izvestaj[])=>{
      this.izvestaji = i;

      this.izvestaji.forEach(izvestaj => {
        this.lekarService.getDoctor(izvestaj.lekar).subscribe((l: Lekar) => {
          izvestaj.imeLekara = l.ime + ' ' + l.prezime;
          izvestaj.specijalizacija = l.specijalizacija;
          izvestaj.datumVreme = new Date(izvestaj.datumVreme);
          izvestaj.datumKontrole = new Date(izvestaj.datumKontrole);
        });
      });
    })  

  }
  

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  sortirajIzvestajePoDatumu(izvestaji: Izvestaj[]): Izvestaj[] {
    if (!izvestaji) {
      return []; 
    }
    
    return izvestaji.sort((a, b) => {
      const datumVremeA = new Date(a.datumVreme);
      const datumVremeB = new Date(b.datumVreme);    
      return datumVremeA.getTime() - datumVremeB.getTime();
    });
  }

  sortirajPregledePoDatumu(pregledi: Pregled[]): Pregled[] {
    return pregledi?.sort((a, b) => {
      const dateA = new Date(`${a.datum.toString().slice(0, 10)}T${a.vreme}:00.000Z`);
      const dateB = new Date(`${b.datum.toString().slice(0, 10)}T${b.vreme}:00.000Z`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  uProslosti(p){
    return new Date(`${p.datum.toString().slice(0, 10)}T${p.vreme}:00.000Z`) < new Date();
  }

  otkaziPregled(p){
    this.pacijentService.otkaziPregled(this.ulogovan.korisnickoIme, p.lekarUsername, p.naziv, p.datum, p.vreme).subscribe((m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.ngOnInit();
      }
    })
    )

    this.lekarService.otkaziPregled(p.lekarUsername, p.naziv, p.datum, p.vreme).subscribe((m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.ngOnInit();
      }
    }))



  }

  formatirajDatum(datum: string): string {
    return datum.slice(0, 10);
  }


}
