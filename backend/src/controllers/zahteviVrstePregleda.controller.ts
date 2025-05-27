import * as express from 'express';
import ZahtevVrstePregleda from '../models/zahteviVrstePregleda';

export class ZahteviVrstePregledaController{

    dodajVrstuPregleda = (req: express.Request, res: express.Response) => {
        let noviPregled = req.body.noviPregled;
        let lekar = req.body.lekar;
        let specijalizacija = req.body.specijalizacija;
        let cena = req.body.cena;
        let trajanje = req.body.trajanje;

        ZahtevVrstePregleda.create({ 'naziv': noviPregled, 'lekar': lekar, 'specijalizacija': specijalizacija, 'cena':cena, 'trajanje': trajanje }, (err, resp) => {
            if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška pri kreiranju zahteva' });
            }
            return res.json({ 'message': 'OK' });
          });
    }

    getAll = (req: express.Request, res: express.Response) => {

        ZahtevVrstePregleda.find({}, (err, zahtev) => {
            if (err) console.log(err);
            else res.json(zahtev)
        })
    }

    ukloniZahtev = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let lekar = req.body.lekar;
        let specijalizacija = req.body.specijalizacija;
    
        ZahtevVrstePregleda.deleteOne({'naziv': naziv, 'lekar':lekar, 'specijalizacija': specijalizacija }, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
        })
    }
}