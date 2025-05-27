import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Lekar = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    mejl: {
        type: String
    },
    brojLicence: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    ogranak: {
        type: String
    },
    profilnaSlika: {
        type: String
    },
    zakazaniPregledi: {
        type: Array
    },
    sviPregledi: {
        type: Array
    }

})

export default mongoose.model('Lekar', Lekar, 'lekari');