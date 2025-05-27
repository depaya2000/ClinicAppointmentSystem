import express from 'express';
import { MenadzerController } from '../controllers/menadzer.controller';
const menadzerRouter = express.Router();

menadzerRouter.route('/login').post(
    (req, res) => new MenadzerController().login(req, res)
)

menadzerRouter.route('/getUser').post(
    (req, res) => new MenadzerController().getUser(req, res)
)

menadzerRouter.route('/changePassword').post(
    (req, res) => new MenadzerController().changePassword(req, res)
)

export default menadzerRouter;