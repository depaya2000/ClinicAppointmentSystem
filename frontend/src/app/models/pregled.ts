import { Time } from "@angular/common";

export class Pregled{
    lekarUsername: string
    lekar: string;
    naziv: string;
    cena: number;
    trajanje: number;
    datum: Date;
    ogranak: string;
    vreme: Time;
    pacijent: string;
    azuriranje: boolean = false;
    imaIzvestaj: boolean;
    showForm: boolean = false;
    showForm1: boolean = false;
}