import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenadzerService } from '../service/menadzer.service';
import Menadzer from '../models/menadzer';

@Component({
  selector: 'app-prijava-menadzera',
  templateUrl: './prijava-menadzera.component.html',
  styleUrls: ['./prijava-menadzera.component.css']
})
export class PrijavaMenadzeraComponent implements OnInit {

  constructor(private router: Router, private menadzerService: MenadzerService) { }
  korisnickoIme: string = "";
  lozinka: string = "";
  greska: string;

  ngOnInit(): void {
  }

  login() {
    if (this.korisnickoIme == "" || this.lozinka == "") {
      this.greska = "Niste uneli sve podatke!";
      return;
    }
    this.greska = "";
    this.menadzerService.login(this.korisnickoIme, this.lozinka).subscribe((k: Menadzer) => {
      if (k) {
        sessionStorage.setItem("ulogovan", k.korisnickoIme)
        sessionStorage.setItem("role", "menadzer")
        this.router.navigate(['menadzer'])
      } else {
        this.greska = "Losi podaci!";
        return;
      }
    })
  }

}
