import { Component, OnInit } from '@angular/core';
import Pacijent from '../models/pacijent';
import Lekar from '../models/lekar';
import { Router } from '@angular/router';
import { LekarService } from '../service/lekar.service';
import { PacijentService } from '../service/pacijent.service';
//import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(private router: Router, private lekarService: LekarService, private pacijentService: PacijentService) { }

  pacijenti: Pacijent[]
  lekari: Lekar[]
  message: string
  message1: string
  selectedImage: File | null = null; 

  ngOnInit(): void {
    if (!sessionStorage.getItem('ulogovan') || sessionStorage.getItem('role') !== 'menadzer') {  
      this.router.navigate(['']);
    }

    this.lekarService.getAllDoctors().subscribe((l:Lekar[])=>{
      this.lekari=l;
    })

    this.pacijentService.getAllUsers().subscribe((p: Pacijent[])=>{
      this.pacijenti=p;
    })
  }

  azurirajLekara(lekar: Lekar) {
    lekar.azuriranje = true;
  }

  azurirajPacijenta(pacijent: Pacijent){
    pacijent.azuriranje = true;
  }

  potvrdiIzmeneLekara(l) {
      this.lekarService.izmeniLekara(l.korisnickoIme, l.ime, l.prezime, l.adresa, l.telefon, l.mejl, l.brojLicence, l.specijalizacija, l.ogranak) .subscribe(m => {
          if (m['message'] === 'OK') {
            this.lekarService.updatePhoto(this.selectedImage, l.korisnickoIme, l.profilnaSlika).subscribe(m => {
          if (m['message'] === 'OK') {
            this.message = 'Lekaru su azurirani podaci';
            this.selectedImage = null;
            this.ngOnInit();
          } else {
            this.message = 'Greška pri slanju slike';
          }
      });
          } else {
            this.message = m['message'];
          }
      });         
    }


  potvrdiIzmenePacijenta(p) {
    this.pacijentService.izmeniPacijenta(p.korisnickoIme, p.ime, p.prezime, p.adresa, p.telefon, p.mejl) .subscribe(m => {
        if (m['message'] === 'OK') {
          this.pacijentService.updatePhoto(this.selectedImage, p.korisnickoIme, p.slika).subscribe(m => {
        if (m['message'] === 'OK') {
          this.message1 = 'Pacijentu su azurirani podaci';
          this.selectedImage = null;
          this.ngOnInit();
        } else {
          this.message1 = 'Greška pri slanju slike';
        }
    });
        } else {
          this.message1 = m['message'];
        }
    });         
  }
  

  obrisiLekara(l){
    this.lekarService.obrisiLekara(l.korisnickoIme).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.pacijenti.forEach(pacijent=>{
          pacijent.zakazaniPregledi.forEach(pregled=>{
            console.log(l.korisnickoIme)
            console.log(pregled.lekarUsername)
            if(pregled.lekarUsername == l.korisnickoIme){
              console.log(pacijent.korisnickoIme)
              console.log(pregled.lekarUsername)
              console.log(pregled.naziv)
              console.log(pregled.datum)
              console.log(pregled.vreme)
              this.pacijentService.otkaziPregled(pacijent.korisnickoIme, pregled.lekarUsername, pregled.naziv, pregled.datum, pregled.vreme).subscribe(m=>{
                if (m['message'] != 'OK') {
                  alert("Greska")
                } else {
                  this.ngOnInit();
                  this.message1="Uspesno ste uklonili lekara"
                }
              })
            }
          })
        })
        this.ngOnInit();
        this.message="Uspesno ste uklonili lekara"
      }
    })
  }

  obrisiPacijenta(p){
    this.pacijentService.obrisiPacijenta(p.korisnickoIme).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.lekari.forEach(lekar=>{ 
          lekar.zakazaniPregledi.forEach(pregled=>{
            if(pregled.pacijent == p.korisnickoIme){
              this.lekarService.otkaziPregled(lekar.korisnickoIme, pregled.naziv, pregled.datum, pregled.vreme).subscribe(m=>{
                if (m['message'] != 'OK') {
                  alert("Greska")
                } else {
                  this.ngOnInit();
                  this.message1="Uspesno ste uklonili pacijenta"
                }
              })
            }
          })
        })
        
        
      }
    })
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0] as File;

    
     if (selectedFile) {
      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);

      image.onload = () => {
          const width = image.width;
          const height = image.height;

          if (width < 100 || height < 100 || width > 300 || height > 300) {
              this.message='Slika nije u odgovarajućoj veličini (minimalno 100x100 px, maksimalno 300x300 px)!'
              this.selectedImage = null;
              event.target.value = '';
          }
        };
      }
  
    if (selectedFile) {
      this.selectedImage = selectedFile;
    } else {
      this.selectedImage = null; 
    }
  }



}
