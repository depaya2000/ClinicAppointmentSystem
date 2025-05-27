import { Component, OnInit } from '@angular/core';
//import { PacijentService } from '../service/pacijent.service';
//import { mergeMap } from 'rxjs/operators';
import { ZahtevRegistracijeService } from '../service/zahtev-registracije.service';


@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private zahtevRegistracijeService: ZahtevRegistracijeService) { }

  ngOnInit(): void {
  }

  korisnickoIme: string = "";
  lozinka: string = "";
  ime: string;
  prezime: string;
  message: string;
  tip: string;
  adresa: string;
  telefon: string;
  mejl: string;
  profilnaSlika: string;
  ponovnaLozinka: string;

  register() {
    if (this.korisnickoIme == "" || this.lozinka == ""  || this.ime==null || this.prezime==null || this.adresa==null|| this.telefon==null || this.mejl==null) {
      this.message = "Niste uneli sve podatke!";
      return;
    }

    if (this.proveraLozinke(this.lozinka)) {
      this.zahtevRegistracijeService.register(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.adresa, this.telefon, this.mejl) .subscribe(m => {
        if (m['message'] === 'OK') {
          this.zahtevRegistracijeService.upload(this.selectedImage, this.korisnickoIme).subscribe(m => {
          if (m['message'] === 'OK') {
            this.message = 'Zahtev za registraciju je uspesno poslat';
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

  selectedImage: File | undefined;

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
    this.profilnaSlika = this.selectedImage?.name;

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
