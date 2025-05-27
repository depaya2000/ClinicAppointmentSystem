import express from 'express';
import { LekarController } from '../controllers/lekar.controller';
import multer from 'multer';
const lekarRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder gde će se slike sačuvati
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Ime slike će biti originalnoIme
    },
});

const upload = multer({ storage });

lekarRouter.route('/login').post(
    (req, res) => new LekarController().login(req, res)
)

lekarRouter.route('/registerDoctor').post(
    (req, res) => new LekarController().registerDoctor(req, res)
)

lekarRouter.route('/upload').post(
    upload.single('image'),
    (req, res) => new LekarController().upload(req, res)
)

lekarRouter.route('/updatePhoto').post(
    upload.single('image'),
    (req, res) => new LekarController().updatePhoto(req, res)
)

lekarRouter.route('/getDoctor').post(
    (req, res) => new LekarController().getDoctor(req, res)
)

lekarRouter.route('/getAllDoctors').get(
    (req, res) => new LekarController().getAllDoctors(req, res)
)

lekarRouter.route('/otkaziPregled').post(
    (req, res) => new LekarController().otkaziPregled(req, res)
)

lekarRouter.route('/zakaziPregled').post(
    (req, res) => new LekarController().zakaziPregled(req, res)
)

lekarRouter.route('/obrisiLekara').post(
    (req, res) => new LekarController().obrisiLekara(req, res)
)

lekarRouter.route('/izmeniLekara').post(
    (req, res) => new LekarController().izmeniLekara(req, res)
)

lekarRouter.route('/dodajSvePreglede').post(
    (req, res) => new LekarController().dodajSvePreglede(req, res)
)

lekarRouter.route('/izmeniSvePreglede').post(
    (req, res) => new LekarController().izmeniSvePreglede(req, res)
)

lekarRouter.route('/changePassword').post(
    (req, res) => new LekarController().changePassword(req, res)
)

lekarRouter.route('/dodajIzvestaj').post(
    (req, res) => new LekarController().dodajIzvestaj(req, res)
)


export default lekarRouter;