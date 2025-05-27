import express from 'express';
import { VrstePregledaController } from '../controllers/vrstePregleda.controller';

const vrstePregledaRouter = express.Router();

vrstePregledaRouter.route('/dodajPregled').post(
    (req, res) => new VrstePregledaController().dodajPregled(req, res)
)

vrstePregledaRouter.route('/dodajSpecijalizaciju').post(
    (req, res) => new VrstePregledaController().dodajSpecijalizaciju(req, res)
)

vrstePregledaRouter.route('/getAll').get(
    (req, res) => new VrstePregledaController().getAll(req, res)
)

vrstePregledaRouter.route('/obrisiPregled').post(
    (req, res) => new VrstePregledaController().obrisiPregled(req, res)
)

vrstePregledaRouter.route('/potvrdiIzmene').post(
    (req, res) => new VrstePregledaController().potvrdiIzmene(req, res)
)

vrstePregledaRouter.route('/getReview').post(
    (req, res) => new VrstePregledaController().getReview(req, res)
)

export default vrstePregledaRouter;