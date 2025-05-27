import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregled } from '../models/pregled';

@Injectable({
  providedIn: 'root'
})
export class VrstePregledaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/vrstePregleda";

  dodajPregled(naziv: string, specijalizacija:string, cena: number, trajanje: number){
    const data={
      naziv:naziv,
      specijalizacija:specijalizacija,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/dodajPregled`, data)
  }

  dodajSpecijalizaciju(specijalizacija: string){
    const data={
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/dodajSpecijalizaciju`, data)
  }

  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }

  obrisiPregled(specijalizacija: string, naziv: string, cena: number, trajanje: number){
    const data={
      specijalizacija: specijalizacija,
      naziv: naziv,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/obrisiPregled`, data)
  }

  potvrdiIzmene(specijalizacija: string, pregledi:Pregled[]){
    const data={
      specijalizacija: specijalizacija,
      pregledi: pregledi
    }
    return this.http.post(`${this.uri}/potvrdiIzmene`, data)
  }

  getReview(specijalizacija: string){
    console.log(specijalizacija)
    const data={
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/getReview`, data)
  }
}
