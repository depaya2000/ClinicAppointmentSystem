import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VrstePregledaService } from '../service/vrste-pregleda.service';
import VrstaPregleda from '../models/vrstaPregleda';
import { LekarService } from '../service/lekar.service';
import { ObavestenjeService } from '../service/obavestenje.service';
import Pacijent from '../models/pacijent';
import { PacijentService } from '../service/pacijent.service';

@Component({
  selector: 'app-uredi',
  templateUrl: './uredi.component.html',
  styleUrls: ['./uredi.component.css']
})
export class UrediComponent implements OnInit {

  constructor(private router: Router,private pacijentService: PacijentService, private vrstaPregledaService: VrstePregledaService, private lekarService: LekarService,private obavestenjeService: ObavestenjeService) { }

  specijalizacija: string;
  nazivPregleda: string;
  specijalizacijaPregleda: string;
  cenaPregleda: number;
  trajanjePregleda: number;
  message1: string;
  message2: string;
  message3: string;
  vrstePregleda: VrstaPregleda[];

  naslovObavestenja: string;
  tekstObavestenja: string;

  sviPacijenti: Pacijent[];

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

    this.vrstaPregledaService.getAll().subscribe((v: VrstaPregleda[])=>{
      this.vrstePregleda = v;
      this.vrstePregleda.forEach(v => {
        v.pregledi.forEach(pregled => {
          if(!pregled.trajanje){
            pregled.trajanje=30;
          } 
        });
      });
    })
  }

  dodajSpecijalizaciju(){
    if(this.specijalizacija == null){
      this.message1="Morate uneti naziv specijalizacije da biste je dodali!"
    } else{
    this.vrstaPregledaService.dodajSpecijalizaciju(this.specijalizacija).subscribe(m=>{
      if (m['message'] == 'OK') {
        this.ngOnInit();
        this.message1="Specijalizacija je dodata u sistem";
      } else if(m['message'] == 'Exists'){
        this.ngOnInit();
        this.message1="Specijalizacija vec postoji u sistemu";
      }else{
        alert("Greska")
      }
    })
  }
  }

  dodajVrstuPregleda(){
    if(!this.nazivPregleda || !this.cenaPregleda || !this.specijalizacijaPregleda) {
      this.message2 = "Morate uneti za sva polja osim za trajanje pregleda!"
    }else{
    if(!this.trajanjePregleda){this.trajanjePregleda=30}
      this.vrstaPregledaService.dodajPregled(this.nazivPregleda, this.specijalizacijaPregleda, this.cenaPregleda, this.trajanjePregleda).subscribe(m=>{
        if (m['message'] != 'OK') {
          alert("Greska")
        } else{
          this.ngOnInit();
          this.message2="Vrsta pregleda je dodata u sistem";
        }
      })
    }
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  azurirajVrstuPregleda(v){
    v.azuriranje=true;
  }

  obrisiVrstuPregleda(v,pregled){
    this.vrstaPregledaService.obrisiPregled(v.specijalizacija, pregled.naziv, pregled.cena, pregled.trajanje).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.ngOnInit();
        this.message3="Uspesno ste uklonili pregled"
      }
    })
  }

  potvrdiIzmene(v){
    this.vrstaPregledaService.potvrdiIzmene(v.specijalizacija,v.pregledi).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.lekarService.izmeniSvePreglede(v.specijalizacija, v.pregledi).subscribe(m=>{
          if (m['message'] != 'OK') {
            alert("Greska")
          } else {
            this.ngOnInit();
            this.message3="Uspesno ste azurirali preglede"
          }
        })
      }
    }) 
  }

  posaljiObavestenje(){
    this.pacijentService.getAllUsers().subscribe((p: Pacijent[])=>{
      this.sviPacijenti = p;
      this.sviPacijenti.forEach(pacijent=>{
        this.obavestenjeService.dodajObavestenje("Lekarska ordinacija Zdravlje", pacijent.korisnickoIme, this.naslovObavestenja, this.tekstObavestenja).subscribe(m=>{
          if (m['message'] != 'OK') {
            alert("Greska")
          } else {
            this.ngOnInit();
            this.message3="Uspesno ste poslali akciju(promociju) pacijentima"
          }
        })
      })
    })
    
    
  }

}
