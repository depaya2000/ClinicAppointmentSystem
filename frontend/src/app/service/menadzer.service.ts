import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenadzerService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/menadzer";

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
    return this.http.post(`${this.uri}/getUser`, data)
  }

  promeniLozinku(korisnickoIme: string, novaLozinka: string){
    const data = {
      username: korisnickoIme,
      newPassword: novaLozinka
    }

    return this.http.post(`${this.uri}/changePassword`, data)
  }

}
