import { Pregled } from "./pregled";

export default class Lekar {
    korisnickoIme: string;
    lozinka: string;
    ime: string;
    prezime: string;
    adresa: string;
    telefon: string;
    mejl: string;
    brojLicence: string;
    specijalizacija: string;
    ogranak: string;
    profilnaSlika: string;
    zakazaniPregledi:Array<Pregled>
    sviPregledi:Array<Pregled>
    azuriranje: boolean = false;
}