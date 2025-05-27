import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    posiljalac: {
        type: String
    },
    pacijent: {
        type: String
    },
    naslov: {
        type: String
    },
    tekst: {
        type: String
    },
    procitano: {
        type: Boolean
    }
})

export default mongoose.model('Obavestenje', Obavestenje, 'obavestenja');