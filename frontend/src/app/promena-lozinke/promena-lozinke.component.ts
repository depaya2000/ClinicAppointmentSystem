import { Component, OnInit } from '@angular/core';
import { PacijentService } from '../service/pacijent.service';
import Pacijent from '../models/pacijent';
import { Router } from '@angular/router';
import { LekarService } from '../service/lekar.service';
import Lekar from '../models/lekar';
import { MenadzerService } from '../service/menadzer.service';
import Menadzer from '../models/menadzer';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private pacijentService: PacijentService, private router: Router, private lekarService: LekarService, private menadzerService: MenadzerService) { }

  ngOnInit(): void {

    const sessionExpirationTime = sessionStorage.getItem('sessionExpirationTime');
    if (sessionExpirationTime && new Date().getTime() > parseInt(sessionExpirationTime, 10)) {
      sessionStorage.clear();
      this.router.navigate(['']);
      return; 
    }

    this.pacijentService.getUser(sessionStorage.getItem('ulogovan')).subscribe((p: Pacijent)=>{
      if(p){
      this.pravaStaraLozinka = p.lozinka;
      this.tip = 'pacijent';
      } else{
        this.lekarService.getDoctor(sessionStorage.getItem('ulogovan')).subscribe((l: Lekar)=>{
          if(l){
          this.pravaStaraLozinka = l.lozinka;
          this.tip = 'lekar';
          } else{
            this.menadzerService.getUser(sessionStorage.getItem('ulogovan')).subscribe((m: Menadzer)=>{
              if(m){
              this.pravaStaraLozinka = m.lozinka;
              this.tip = 'menadzer';
            } else{
                this.router.navigate(['']);
            }
          })
        }
      })
    }
    })
  }

  tip: string;
  pravaStaraLozinka: string
  staraLozinka: string
  novaLozinka: string
  ponovnaNovaLozinka: string
  message: string

  promeniLozinku(){
    if (this.staraLozinka == null || this.novaLozinka == null || this.ponovnaNovaLozinka == null) {
      this.message = "Niste uneli sve podatke!";
      return;
    }
    if(this.staraLozinka == this.pravaStaraLozinka && this.novaLozinka == this. ponovnaNovaLozinka && this.proveraLozinke() == true){
      if(this.tip == 'pacijent'){
      this.pacijentService.promeniLozinku(sessionStorage.getItem('ulogovan'), this.novaLozinka).subscribe(m=>{
        if (m['message'] === 'OK') {
          this.message = 'Lozinka je promenjena';
          this.logout();
        } else {
          this.message ='Greska';
        }
      })
    }else if(this.tip == 'lekar'){
      this.lekarService.promeniLozinku(sessionStorage.getItem('ulogovan'), this.novaLozinka).subscribe(m=>{
        if (m['message'] === 'OK') {
          this.message = 'Lozinka je promenjena';
          this.logout();
        } else {
          this.message ='Greska';
        }
      })
    } else{
        this.menadzerService.promeniLozinku(sessionStorage.getItem('ulogovan'), this.novaLozinka).subscribe(m=>{
          if (m['message'] === 'OK') {
            this.message = 'Lozinka je promenjena';
            this.logout();
          } else {
            this.message ='Greska';
          }
        })
      
    }
    } else if(this.staraLozinka != this.pravaStaraLozinka){
      this.message = "Niste uneli ispravno trenutnu lozinku"
    } else if(this.novaLozinka != this.ponovnaNovaLozinka){
      this.message = "Niste uneli dva puta istu novu lozinku"
    } else if(this.proveraLozinke()==false){
      this.message = "Lozinka nije u odgovarajucem formatu"
    }
  }

  proveraLozinke(): boolean {
    
    const lozinkaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&][^\s]{7,13}$/;
  
    
    if (this.novaLozinka.length < 8 || this.novaLozinka.length > 14 || !this.novaLozinka.match(lozinkaRegex)) {
      return false; 
    }
  
    
    for (let i = 0; i < this.novaLozinka.length - 1; i++) {
      if (this.novaLozinka[i] === this.novaLozinka[i + 1]) {
        return false; 
      }
    }
    
  
    return true; 
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

}
