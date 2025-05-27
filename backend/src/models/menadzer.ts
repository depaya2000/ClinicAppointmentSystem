import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Menadzer = new Schema({
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
    }

})

export default mongoose.model('Menadzer', Menadzer, 'menadzeri');