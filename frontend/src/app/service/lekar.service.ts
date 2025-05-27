import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregled } from '../models/pregled';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/lekar";

  login(username: string, password: string) {
    let data = {
      username: username, password: password
    }
    return this.http.post(`${this.uri}/login`, data)
  }

  updatePhoto(selectedImage: File, korisnickoIme: string, slika: string){
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('korisnickoIme', korisnickoIme);
    formData.append('slika', slika);

    return this.http.post(`${this.uri}/updatePhoto`, formData)
  }

  getDoctor(username: string) {
    let data = {
      username: username
    }
    return this.http.post(`${this.uri}/getDoctor`, data)
  }

  getAllDoctors() {
    return this.http.get(`${this.uri}/getAllDoctors`);
  }

  promeniLozinku(korisnickoIme: string, novaLozinka: string){
    const data = {
      username: korisnickoIme,
      newPassword: novaLozinka
    }

    return this.http.post(`${this.uri}/changePassword`, data)
  }

  otkaziPregled(lekarUsername: string, naziv: string, datum: Date, vreme: Time){
    const data = {
      lekarUsername: lekarUsername,
      naziv: naziv,
      datum: datum,
      vreme: vreme
    }

    return this.http.post(`${this.uri}/otkaziPregled`, data)
  }

  zakaziPregled(lekarUsername: string, pregled: string, datum: Date, vreme: Time, pacijent: string){
    const data = {
      lekarUsername: lekarUsername,
      nazivPregleda: pregled,
      datum: datum,
      vreme: vreme,
      pacijent: pacijent,
    }
    //console.log(username, lekar, naziv, datum, vreme)

    return this.http.post(`${this.uri}/zakaziPregled`, data)
  }

  obrisiLekara(username: string){
    const data = {
      lekar: username
    }

    return this.http.post(`${this.uri}/obrisiLekara`, data)
  }

  izmeniLekara(username: string, ime:string, prezime:string, adresa:string, telefon:string, mejl:string, brojLicence: string, specijalizacija: string, ogranak: string){
    const data = {
      username: username,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
      brojLicence: brojLicence,
      specijalizacija: specijalizacija,
      ogranak: ogranak
    }

    return this.http.post(`${this.uri}/izmeniLekara`, data)
  } 

  registerDoctor(korisnickoIme:string, lozinka:string, ime: string, prezime: string, adresa: string, telefon:string, mejl:string, brojLicence:string, specijalizacija:string, ogranak:string){
  const data = {
    username: korisnickoIme,
    lozinka: lozinka,
    ime: ime,
    prezime: prezime,
    adresa: adresa,
    telefon: telefon,
    mejl: mejl,
    brojLicence: brojLicence,
    specijalizacija: specijalizacija,
    ogranak: ogranak
  }

    return this.http.post(`${this.uri}/registerDoctor`, data)
  }

  upload(selectedImage: File, korisnickoIme: string){
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('korisnickoIme', korisnickoIme);

    return this.http.post(`${this.uri}/upload`, formData)
  }

  dodajPregled(naziv: string, lekar: string, specijalizacija:string){
    const data = {
      naziv: naziv,
      lekar: lekar,
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/dodajPregled`, data)
  }

  dodajSvePreglede(username: string, pregledi: Pregled[]){
    const data = {
      username: username,
      pregledi: pregledi
    }
    return this.http.post(`${this.uri}/dodajSvePreglede`, data)
  }

  izmeniSvePreglede(specijalizacija: string, pregledi: Pregled[]){
    const data = {
      specijalizacija: specijalizacija,
      pregledi: pregledi
    }
    console.log(specijalizacija);
    console.log(pregledi.length)
    return this.http.post(`${this.uri}/izmeniSvePreglede`, data)
  }

  dodajIzvestaj(lekar: string, naziv: string, datum: Date, vreme: Time, pacijent: string){
    const data = {
      lekar: lekar,
      naziv: naziv,
      datum: datum,
      vreme: vreme,
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/dodajIzvestaj`, data)
  }


}
