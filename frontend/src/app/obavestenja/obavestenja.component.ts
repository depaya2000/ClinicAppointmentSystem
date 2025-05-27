import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Obavestenje } from '../models/obavestenje';
import { ObavestenjeService } from '../service/obavestenje.service';
import { LekarService } from '../service/lekar.service';
import Lekar from '../models/lekar';


@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  constructor(private router: Router, private obavestenjeService: ObavestenjeService, private lekarService: LekarService) { }

  obavestenja: Obavestenje[];

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

   this.obavestenjeService.getUsersNotification(sessionStorage.getItem('ulogovan')).subscribe((o:Obavestenje[])=>{
     this.obavestenja=o;
     this.obavestenja.forEach(obavestenje=>{
      if(obavestenje.posiljalac != "Lekarska ordinacija Zdravlje"){
      this.lekarService.getDoctor(obavestenje.posiljalac).subscribe((l:Lekar)=>{
        console.log(l.ime)
      obavestenje.imePosiljaoca = l.ime+" "+l.prezime;
      })
    }else{
      obavestenje.imePosiljaoca="Lekarska ordinacija Zdravlje";
    }
   })
  })
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  prikaziObavestenje(o){
    console.log(o.procitano)
    o.showForm = true;
    o.procitano=true;
    console.log(o.showForm)
    this.obavestenjeService.procitajObavestenje(o.posiljalac, o.pacijent, o.naslov, o.tekst).subscribe(m=>{
    if (m['message'] != 'OK') {
      alert("Greska")
    } else {
      //this.ngOnInit();
    }
  })
    
  }

  zatvoriObavestenje(o){
    o.showForm = false;
  }



}
