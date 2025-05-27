import express from 'express';
import { ObavestenjeController } from '../controllers/obavestenje.controller';

const obavestenjeRouter = express.Router();


obavestenjeRouter.route('/dodajObavestenje').post(
    (req, res) => new ObavestenjeController().dodajObavestenje(req, res)
)

obavestenjeRouter.route('/procitajObavestenje').post(
    (req, res) => new ObavestenjeController().procitajObavestenje(req, res)
)

obavestenjeRouter.route('/getUsersNotification').post(
    (req, res) => new ObavestenjeController().getUsersNotification(req, res)
)

export default obavestenjeRouter;