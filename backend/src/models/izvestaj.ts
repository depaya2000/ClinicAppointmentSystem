
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
    lekar: {
        type: String
    },
    datumVreme: {
        type: Date
    },
    pacijent: {
        type: String
    },
    datumKontrole: {
        type: Date
    },
    razlogDolaska: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    }

})

export default mongoose.model('Izvestaj', Izvestaj, 'izvestaji');