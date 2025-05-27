import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Pacijent = new Schema({
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
    slika: {
        type: String
    },
    zakazaniPregledi:{
        type: Array
    },
    izvestaji: {
        type: Array
    }

})

export default mongoose.model('Pacijent', Pacijent, 'pacijenti');