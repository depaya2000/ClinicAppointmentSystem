import express from 'express';
import { ZahteviVrstePregledaController } from '../controllers/zahteviVrstePregleda.controller';

const zahteviVrstePregledaRouter = express.Router();

zahteviVrstePregledaRouter.route('/dodajVrstuPregleda').post(
    (req, res) => new ZahteviVrstePregledaController().dodajVrstuPregleda(req, res)
)

zahteviVrstePregledaRouter.route('/getAll').get(
    (req, res) => new ZahteviVrstePregledaController().getAll(req, res)
)

zahteviVrstePregledaRouter.route('/ukloniZahtev').post(
    (req, res) => new ZahteviVrstePregledaController().ukloniZahtev(req, res)
)


export default zahteviVrstePregledaRouter;