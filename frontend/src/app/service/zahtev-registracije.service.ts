import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahtevRegistracijeService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/zahteviRegistracije"

  register(username:string, password:string, ime:string, prezime:string, adresa:string, telefon:string, mejl:string){
    const data = {
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
    }

    return this.http.post(`${this.uri}/register`, data)
  }

  upload(selectedImage: File, korisnickoIme: string){
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('korisnickoIme', korisnickoIme);

    return this.http.post(`${this.uri}/upload`, formData)
  }

  getAll() {
    return this.http.get(`${this.uri}/getAll`);
  }

  ukloniZahtev(username: string){
    const data={
      username: username
    }

    return this.http.post(`${this.uri}/ukloniZahtev`, data)
  }

  odbijZahtev(username: string){
    const data={
      username: username
    }

    return this.http.post(`${this.uri}/odbijZahtev`, data)
  }

}
