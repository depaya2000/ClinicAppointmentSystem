import express, { Router,Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import lekarRouter from './routes/lekar.routes';
import pacijentRouter from './routes/pacijent.routes';
import menadzerRouter from './routes/menadzer.routes';
import zahteviRegistracijeRouter from './routes/zahteviRegistracije.routes';
import zahteviVrstePregledaRouter from './routes/zahteviVrstePregleda.routes';
import vrstePregledaRouter from './routes/vrstePregleda.routes';
import izvestajRouter from './routes/izvestaj.routes';
import obavestenjeRouter from './routes/obavestenje.routes';


const router = Router()
const app = express();
//const path = require("path"); 

app.use(cors());
app.use(bodyParser.json());

//router.use('/uploads', express.static('backend/uploads'));
app.use('/uploads', express.static('./uploads'));
  
mongoose.connect("mongodb://127.0.0.1:27017/lekarskaOrdinacija")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})


router.use('/lekar', lekarRouter)
router.use('/pacijent', pacijentRouter)
router.use('/menadzer', menadzerRouter)
router.use('/zahteviRegistracije', zahteviRegistracijeRouter)
router.use('/zahteviVrstePregleda', zahteviVrstePregledaRouter)
router.use('/vrstePregleda', vrstePregledaRouter)
router.use('/izvestaj', izvestajRouter)
router.use('/obavestenje', obavestenjeRouter)
app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));