import express from 'express';
import { IzvestajController } from '../controllers/izvestaj.controller';

const izvestajRouter = express.Router();


izvestajRouter.route('/dodajIzvestaj').post(
    (req, res) => new IzvestajController().dodajIzvestaj(req, res)
)

izvestajRouter.route('/getUsersReports').post(
    (req, res) => new IzvestajController().getUsersReports(req, res)
)




export default izvestajRouter;