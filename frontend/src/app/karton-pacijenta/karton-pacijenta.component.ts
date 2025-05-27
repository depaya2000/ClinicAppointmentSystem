import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pacijent from '../models/pacijent';
import { PacijentService } from '../service/pacijent.service';
import { Izvestaj } from '../models/izvestaj';
import Lekar from '../models/lekar';
import { LekarService } from '../service/lekar.service';
import { IzvestajService } from '../service/izvestaj.service';

@Component({
  selector: 'app-karton-pacijenta',
  templateUrl: './karton-pacijenta.component.html',
  styleUrls: ['./karton-pacijenta.component.css']
})
export class KartonPacijentaComponent implements OnInit {

  constructor(private router: Router, private pacijentService: PacijentService, private lekarService: LekarService, private izvestajService: IzvestajService) { }
  
  ulogovan: Lekar;
  pacijent: Pacijent;
  //noviIzvestaj: Izvestaj;
  izvestaji: Izvestaj[];

  message: string;
  

  ngOnInit(): void {

    if (!sessionStorage.getItem('ulogovan') || sessionStorage.getItem('role') !== 'lekar') {  
      this.router.navigate(['']);
    }

    this.pacijentService.getUser(localStorage.getItem("pacijentKarton")).subscribe((pacijent: Pacijent)=>{
      this.pacijent = pacijent;
    })

    this.izvestajService.getUsersReports(localStorage.getItem("pacijentKarton")).subscribe((i: Izvestaj[])=>{
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

    this.lekarService.getDoctor(sessionStorage.getItem("ulogovan")).subscribe((l: Lekar)=>{
      this.ulogovan = l;
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
      return a.datumVreme.getTime() - b.datumVreme.getTime();
    });
  }

 

}
