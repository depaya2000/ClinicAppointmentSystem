import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ZahtevRegistracije = new Schema({
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
    slika: {
        type: String
    },
    odbijen: {
        type: Boolean
    }

})

export default mongoose.model('ZahtevRegistracije', ZahtevRegistracije , 'zahteviRegistracije');