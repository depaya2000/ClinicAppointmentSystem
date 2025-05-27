import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/obavestenje";

  dodajObavestenje(posiljalac: string, pacijent: string, naslov: string, tekst: string ){
    const data={
      pacijent: pacijent,
      posiljalac: posiljalac,
      naslov: naslov,
      tekst: tekst
    }
    return this.http.post(`${this.uri}/dodajObavestenje`, data)
  }

  procitajObavestenje(posiljalac: string, pacijent: string, naslov: string, tekst: string ){
    const data={
      pacijent: pacijent,
      posiljalac: posiljalac,
      naslov: naslov,
      tekst: tekst
    }
    return this.http.post(`${this.uri}/procitajObavestenje`, data)
  }

  getUsersNotification(username: string){
    const data={
      pacijent: username
    }

    return this.http.post(`${this.uri}/getUsersNotification`, data)
  }

}
