import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar';
import { PacijentService } from '../service/pacijent.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LekarService } from '../service/lekar.service';
import { Pregled } from '../models/pregled';
import VrstaPregleda from '../models/vrstaPregleda';
import { VrstePregledaService } from '../service/vrste-pregleda.service';
//import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {

  constructor(private lekarService: LekarService, private router: Router, private http: HttpClient, private vrstePregledaService: VrstePregledaService) { }

  ulogovan: Lekar;
  srcSlike: string;
  izabraniPregledi: Pregled[];
  vrstaPregleda: VrstaPregleda;
  message: string;
  message1: string;
  selectedImage: File | null = null;
  
  ngOnInit(): void {
    if (!sessionStorage.getItem('ulogovan') || sessionStorage.getItem('role') !== 'lekar') {
     
      this.router.navigate(['']);
    }

    this.lekarService.getDoctor(sessionStorage.getItem('ulogovan')).subscribe(( l:Lekar)=>{
      this.ulogovan = l;
      this.vrstePregledaService.getReview(this.ulogovan.specijalizacija).subscribe((p:VrstaPregleda) => {
        this.vrstaPregleda = p;
    });
  })
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  odaberiPreglede(){
    console.log(this.izabraniPregledi.length)
    this.lekarService.dodajSvePreglede(this.ulogovan.korisnickoIme,this.izabraniPregledi).subscribe(m=>{
      if (m['message'] != 'OK') {
        alert("Greska")
      } else {
        this.ngOnInit();
        this.message1="Uspesno ste izabrali preglede"
      }
    })
  }

  azurirajLekara(){
    this.ulogovan.azuriranje = true;
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

  potvrdiIzmeneLekara() {
    this.lekarService.izmeniLekara(this.ulogovan.korisnickoIme, this.ulogovan.ime, this.ulogovan.prezime, this.ulogovan.adresa, this.ulogovan.telefon, this.ulogovan.mejl, this.ulogovan.brojLicence, this.ulogovan.specijalizacija, this.ulogovan.ogranak) .subscribe(m => {
        if (m['message'] === 'OK') {
          this.lekarService.updatePhoto(this.selectedImage, this.ulogovan.korisnickoIme, this.ulogovan.profilnaSlika).subscribe(m => {
        if (m['message'] === 'OK') {
          this.message = 'Azurirali ste svoje podatke';
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


}


