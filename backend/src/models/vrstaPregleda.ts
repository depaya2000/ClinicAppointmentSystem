import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let VrstaPregleda = new Schema({
    pregledi: {
        type: Array
    },
    specijalizacija: {
        type: String
    }

})

export default mongoose.model('VrstaPregleda', VrstaPregleda , 'vrstePregleda');