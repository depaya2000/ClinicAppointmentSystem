import express from 'express';
import { PacijentController } from '../controllers/pacijent.controller';
import multer from 'multer';
const pacijentRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder gde će se slike sačuvati
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Ime slike će biti originalnoIme
    },
});

const upload = multer({ storage });

pacijentRouter.route('/login').post(
    (req, res) => new PacijentController().login(req, res)
)

pacijentRouter.route('/getUser').post(
    (req, res) => new PacijentController().getUser(req, res)
)

pacijentRouter.route('/getAllUsers').get(
    (req, res) => new PacijentController().getAllUsers(req, res)
)

pacijentRouter.route('/updatePhoto').post(
    upload.single('image'),
    (req, res) => new PacijentController().updatePhoto(req, res)
)

pacijentRouter.route('/changePassword').post(
    (req, res) => new PacijentController().changePassword(req, res)
)

pacijentRouter.route('/otkaziPregled').post(
    (req, res) => new PacijentController().otkaziPregled(req, res)
)

pacijentRouter.route('/zakaziPregled').post(
    (req, res) => new PacijentController().zakaziPregled(req, res)
)

pacijentRouter.route('/dodajIzvestaj').post(
    (req, res) => new PacijentController().dodajIzvestaj(req, res)
)

pacijentRouter.route('/obrisiPacijenta').post(
    (req, res) => new PacijentController().obrisiPacijenta(req, res)
)

pacijentRouter.route('/izmeniPacijenta').post(
    (req, res) => new PacijentController().izmeniPacijenta(req, res)
)

pacijentRouter.route('/addUser').post(
    (req, res) => new PacijentController().addUser(req, res)
)


export default pacijentRouter;