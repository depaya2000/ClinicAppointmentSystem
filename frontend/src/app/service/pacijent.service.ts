import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Izvestaj } from '../models/izvestaj';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/pacijent";

  login(username: string, password: string) {
    let data = {
      username: username, password: password
    }
    return this.http.post(`${this.uri}/login`, data)
  }

  getUser(username: string) {
    let data = {
      username: username
    }
    console.log(username)
    return this.http.post(`${this.uri}/getUser`, data)
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/getAllUsers`);
  }

  

  updatePhoto(selectedImage: File, korisnickoIme: string, slika: string){
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('korisnickoIme', korisnickoIme);
    formData.append('slika', slika);

    return this.http.post(`${this.uri}/updatePhoto`, formData)
  }

  promeniLozinku(korisnickoIme: string, novaLozinka: string){
    const data = {
      username: korisnickoIme,
      newPassword: novaLozinka
    }

    return this.http.post(`${this.uri}/changePassword`, data)
  }

  otkaziPregled(username: string, lekar: string, naziv: string, datum: Date, vreme: Time){
    const data = {
      username: username,
      lekar: lekar,
      naziv: naziv,
      datum: datum,
      vreme: vreme
    }
    console.log(username, lekar, naziv, datum, vreme)

    return this.http.post(`${this.uri}/otkaziPregled`, data)
  }

  zakaziPregled(pacijentUsername: string, lekarUsername: string, pregled: string, datum: Date, vreme: Time){
    const data = {
      pacijentUsername: pacijentUsername,
      lekarUsername: lekarUsername,
      nazivPregleda: pregled,
      datum: datum,
      vreme: vreme
    }
    //console.log(username, lekar, naziv, datum, vreme)

    return this.http.post(`${this.uri}/zakaziPregled`, data)
  }

  dodajIzvestaj(pacijent: string, izvestaj: Izvestaj){
    const data = {
      pacijent: pacijent,
      izvestaj: izvestaj
    }

    return this.http.post(`${this.uri}/dodajIzvestaj`, data)
  }

  obrisiPacijenta(username: string){
    const data = {
      pacijent: username
    }

    return this.http.post(`${this.uri}/obrisiPacijenta`, data)
  }

  izmeniPacijenta(username: string, ime:string, prezime:string, adresa:string, telefon:string, mejl:string){
    const data = {
      username: username,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
    }

    return this.http.post(`${this.uri}/izmeniPacijenta`, data)
  }
  
  addUser(username: string, lozinka: string, ime: string, prezime: string, adresa: string, telefon: string, mejl: string, slika: string){
    const data = {
      username: username,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
      slika: slika,
    }

    return this.http.post(`${this.uri}/addUser`, data)
  }


}
