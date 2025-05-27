import { Component, OnInit } from '@angular/core';
import { ZahteviVrstePregledaService } from '../service/zahtevi-vrste-pregleda.service';
import { Router } from '@angular/router';
import Lekar from '../models/lekar';
import { LekarService } from '../service/lekar.service';

@Component({
  selector: 'app-razno',
  templateUrl: './razno.component.html',
  styleUrls: ['./razno.component.css']
})
export class RaznoComponent implements OnInit {

  constructor(private zahtevVrstaPregleda: ZahteviVrstePregledaService, private router: Router, private lekarService: LekarService) { }

  ulogovan: Lekar
  nazivPregleda: string;
  message: string;
  cenaPregleda: number;
  trajanjePregleda: number;


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

    this.lekarService.getDoctor(sessionStorage.getItem('ulogovan')).subscribe((l: Lekar)=>{
      this.ulogovan = l;
    })
  }

  dodajVrstuPregleda(){
    if (this.nazivPregleda==null) {
      this.message = "Morate uneti barem naziv pregleda!";
      return;
    }
    if (this.cenaPregleda<0 || this.trajanjePregleda<0) {
      this.message = "Cena i trajanje pregleda moraju biti pozitivni brojevi";
      return;
    }
    this.zahtevVrstaPregleda.dodajVrstuPregleda(this.nazivPregleda, this.ulogovan.korisnickoIme, this.ulogovan.specijalizacija, this.cenaPregleda, this.trajanjePregleda).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.ngOnInit();
        this.message="Poslali ste zahtev za dodavanje nove vrste pregleda"
      }
    })
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

}
