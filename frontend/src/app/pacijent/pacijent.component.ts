import { Component, OnInit } from '@angular/core';
import { PacijentService } from '../service/pacijent.service';
import Pacijent from '../models/pacijent';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  constructor(private pacijentService: PacijentService, private router: Router, private http: HttpClient) { }

  ulogovan: Pacijent;
  srcSlike: string
  selectedImage: File | null = null;
  message: string; 
  
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

    this.pacijentService.getUser(sessionStorage.getItem('ulogovan')).subscribe((p: Pacijent)=>{
      this.ulogovan = p;
    })
  }

  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  azurirajPacijenta(){
    this.ulogovan.azuriranje = true;
  }

  potvrdiIzmenePacijenta() {
    this.pacijentService.izmeniPacijenta(this.ulogovan.korisnickoIme, this.ulogovan.ime, this.ulogovan.prezime, this.ulogovan.adresa, this.ulogovan.telefon, this.ulogovan.mejl) .subscribe(m => {
        if (m['message'] === 'OK') {
          this.pacijentService.updatePhoto(this.selectedImage, this.ulogovan.korisnickoIme, this.ulogovan.slika).subscribe(m => {
        if (m['message'] === 'OK') {
          this.message = 'Azurirali ste svoje podatke!';
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
