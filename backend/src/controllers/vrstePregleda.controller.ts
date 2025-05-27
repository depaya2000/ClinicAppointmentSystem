import * as express from 'express';
import VrstaPregleda from '../models/vrstaPregleda';

export class VrstePregledaController{

    dodajPregled = (req: express.Request, res: express.Response) => {
        
        let specijalizacija = req.body.specijalizacija;
        let pregled = {naziv: req.body.naziv,
                        cena: req.body.cena,
                        trajanje: req.body.trajanje}

        

        VrstaPregleda.findOne({ specijalizacija: specijalizacija }, (err, vrstaPregleda) => {
            if (err) {
                console.log(err);
                return res.json({ message: 'Greška pri pretrazi' });
            }
                        
            if (!vrstaPregleda) {
            VrstaPregleda.create({ 'pregledi': pregled,  'specijalizacija': specijalizacija }, (err, resp) => {
            if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška pri kreiranju zahteva' });
            }
            return res.json({ 'message': 'OK' });
          });
        }else{
            VrstaPregleda.updateOne({'specijalizacija': specijalizacija},{$push:{'pregledi': pregled}},{ upsert: true }, (err, resp) => {
                if (err) {
                  console.log(err);
                  return res.json({ 'message': 'Greška pri kreiranju zahteva' });
                }
                return res.json({ 'message': 'OK' });
        });
        }
    });
    }

    dodajSpecijalizaciju = (req: express.Request, res: express.Response) => {
        
        let specijalizacija = req.body.specijalizacija;
        

        VrstaPregleda.findOne({ specijalizacija: specijalizacija }, (err, vrstaPregleda) => {
            if (err) {
                console.log(err);
                return res.json({ message: 'Greška pri pretrazi' });
            }
                        
            if (!vrstaPregleda) {
            VrstaPregleda.create({ 'specijalizacija': specijalizacija }, (err, resp) => {
            if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška pri kreiranju zahteva' });
            }
            return res.json({ 'message': 'OK' });
          });
        }else{
            return res.json({ 'message': 'Exists' });
        }
    });
    }

    getAll = (req: express.Request, res: express.Response) => {

        VrstaPregleda.find({}, (err, pregledi) => {
            if (err) console.log(err);
            else res.json(pregledi)
        })
    }

    obrisiPregled = (req: express.Request, res: express.Response) => {

        let specijalizacija = req.body.specijalizacija;
        let naziv = req.body.naziv;
        let cena = req.body.cena;
        let trajanje = req.body.trajanje;

        VrstaPregleda.updateOne({'specijalizacija': specijalizacija },{$pull:{'pregledi': {'naziv': naziv, 'cena': cena, 'trajanje': trajanje}}}, (err, resp) => {
            if (err) {
                console.log(err);
                return res.json({ 'message': 'Greška na serveru' });
            }
            return res.json({ 'message': 'OK' });
          })  
    }

    potvrdiIzmene = (req: express.Request, res: express.Response) => {

        let specijalizacija = req.body.specijalizacija;
        let pregledi = req.body.pregledi;

        VrstaPregleda.updateOne({'specijalizacija': specijalizacija },{$set:{'pregledi':pregledi}}, (err, resp) => {
            if (err) {
                console.log(err);
                return res.json({ 'message': 'Greška na serveru' });
            }
            return res.json({ 'message': 'OK' });
          })  
    }

    getReview = (req: express.Request, res: express.Response) => {

        let specijalizacija = req.body.specijalizacija;

        VrstaPregleda.findOne({'specijalizacija': specijalizacija}, (err, pregled) => {
            if (err) console.log(err);
            else res.json(pregled)
        })
    }

}
