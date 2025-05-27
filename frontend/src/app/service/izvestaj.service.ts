import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Izvestaj } from '../models/izvestaj';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IzvestajService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/izvestaj";

  dodajIzvestaj(pacijent: string, lekar: string, datumVreme: Date, dijagnoza: string, terapija: string, razlogDolaska: string, datumKontrole: Date ){
    const data={
      pacijent: pacijent,
      lekar: lekar,
      datumVreme: datumVreme,
      dijagnoza: dijagnoza,
      terapija: terapija,
      razlogDolaska: razlogDolaska,
      datumKontrole: datumKontrole
    }
    return this.http.post(`${this.uri}/dodajIzvestaj`, data)
  }

  getUsersReports(username: string){
    const data={
      pacijent: username
    }

    return this.http.post(`${this.uri}/getUsersReports`, data)
  }

  
}
