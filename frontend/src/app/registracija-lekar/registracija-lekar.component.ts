import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekarService } from '../service/lekar.service';
//import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-registracija-lekar',
  templateUrl: './registracija-lekar.component.html',
  styleUrls: ['./registracija-lekar.component.css']
})
export class RegistracijaLekarComponent implements OnInit {

  constructor(private router: Router, private lekarService: LekarService) { }

  korisnickoIme: string;
  lozinka: string;
  ponovnaLozinka: string;
  ime: string;
  prezime: string;
  telefon: string;
  adresa: string;
  mejl: string;
  ogranak: string;
  brojLicence: string;
  specijalizacija: string;
  message: string;


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

  }

  logout() {
    localStorage.removeItem("ulogovan")
    this.router.navigate([''])
  }

  selectedImage: File | undefined;

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
    //this.profilnaSlika = this.selectedImage?.name;

     if (this.selectedImage) {
      const image = new Image();
      image.src = URL.createObjectURL(this.selectedImage);

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
  }

  registerDoctor() {
    if (this.korisnickoIme == null || this.lozinka == null || this.ime==null || this.prezime==null || this.adresa==null|| this.telefon==null || this.mejl==null || this.ogranak==null || this.brojLicence==null ||this.specijalizacija==null) {
      this.message = "Niste uneli sve podatke!";
      return;
    }

    if (this.proveraLozinke(this.lozinka)) {
      this.lekarService.registerDoctor(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.adresa, this.telefon, this.mejl, this.brojLicence, this.specijalizacija, this.ogranak) .subscribe(m => {
            if (m['message'] === 'OK') {
                this.lekarService.upload(this.selectedImage, this.korisnickoIme).subscribe(m => {
          if (m['message'] === 'OK') {
            this.message = 'Lekar je registrovan';
          } else {
            this.message = 'Greška pri slanju slike';
          }
        });
            } else {
              this.message = m['message'];
            }
    });         
    } else {
      this.message = 'Greška sa lozinkom !';
    }
  }

  proveraLozinke(password): boolean {
    const lozinkaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&][^\s]{7,13}$/;
  
    if (password.length < 8 || password.length > 14 || !password.match(lozinkaRegex)) {
      return false; 
    }
  
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i] === password[i + 1]) {
        return false; 
      }
    }

    if(this.lozinka != this.ponovnaLozinka){
      return false
    }
  
    return true; 
  }

}
