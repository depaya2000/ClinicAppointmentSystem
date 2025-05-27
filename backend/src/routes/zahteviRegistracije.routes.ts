import express from 'express';
import { ZahteviRegistracijeController } from '../controllers/zahteviRegistracije.controller';
import multer from 'multer';
const zahteviRegistracijeRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder gde će se slike sačuvati
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Ime slike će biti originalnoIme
    },
});

const upload = multer({ storage });

zahteviRegistracijeRouter.route('/register').post(
    (req, res) => new ZahteviRegistracijeController().register(req, res)
)

zahteviRegistracijeRouter.route('/upload').post(
    upload.single('image'),
    (req, res) => new ZahteviRegistracijeController().upload(req, res)
)

zahteviRegistracijeRouter.route('/getAll').get(
    (req, res) => new ZahteviRegistracijeController().getAll(req, res)
)

zahteviRegistracijeRouter.route('/ukloniZahtev').post(
    (req, res) => new ZahteviRegistracijeController().ukloniZahtev(req, res)
)

zahteviRegistracijeRouter.route('/odbijZahtev').post(
    (req, res) => new ZahteviRegistracijeController().odbijZahtev(req, res)
)

export default zahteviRegistracijeRouter;