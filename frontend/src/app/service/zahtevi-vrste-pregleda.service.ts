import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahteviVrstePregledaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/zahteviVrstePregleda";

  dodajVrstuPregleda(noviPregled: string, lekar: string, specijalizacija: string, cena: number, trajanje: number){
    const data = {
      noviPregled: noviPregled,
      lekar: lekar,
      specijalizacija: specijalizacija,
      cena: cena,
      trajanje: trajanje
    }

    return this.http.post(`${this.uri}/dodajVrstuPregleda`, data)
  }

  getAll() {
    return this.http.get(`${this.uri}/getAll`);
  }

  ukloniZahtev(naziv: string, lekar: string, specijalizacija: string){
    const data={
      naziv: naziv,
      lekar: lekar,
      specijalizacija: specijalizacija

    }

    return this.http.post(`${this.uri}/ukloniZahtev`, data)
  }

}
