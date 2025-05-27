import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ZahtevVrstePregleda = new Schema({
    naziv: {
        type: String
    },
    lekar: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    cena: {
        type: Number
    },
    trajanje:{
        type: Number
    }

})

export default mongoose.model('ZahtevVrstePregleda', ZahtevVrstePregleda , 'zahteviVrstePregleda');