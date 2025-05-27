import { Izvestaj } from "./izvestaj";
import { Pregled } from "./pregled";

export default class Pacijent {
    korisnickoIme: string;
    lozinka: string;
    ime: string;
    prezime: string;
    tip: string;
    adresa: string;
    telefon: string;
    mejl: string;
    slika: string;
    zakazaniPregledi: Array<Pregled>;
    izvestaji: Array<Izvestaj>
    azuriranje: boolean = false;
}