import * as express from 'express';
import ZahtevRegistracije from '../models/zahteviRegistracije';
import Pacijent from '../models/pacijent';
//import * as sizeOf from 'image-size';

export class ZahteviRegistracijeController{
    register = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let mejl = req.body.mejl;
      
        
        ZahtevRegistracije.findOne({ $or: [{ 'korisnickoIme': username }, { 'mejl': mejl }] }, (err, postojiPacijent) => {
          if (err) {
            console.log(err);
            return res.json({ 'message': 'Greška na serveru' });
          }
      
          if (postojiPacijent) {
            if (postojiPacijent.korisnickoIme === username) {
              return res.json({ 'message': 'Takvo korisničko ime već postoji' });
            }
      
            if (postojiPacijent.mejl === mejl) {
              return res.json({ 'message': 'Takva mejl adresa već postoji' });
            }
          }

          Pacijent.findOne({ $or: [{ 'korisnickoIme': username }, { 'mejl': mejl }] }, (err, postojiPacijent) => {
            if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
            }
        
            if (postojiPacijent) {
              if (postojiPacijent.korisnickoIme === username) {
                return res.json({ 'message': 'Takvo korisničko ime već postoji' });
              }
        
              if (postojiPacijent.mejl === mejl) {
                return res.json({ 'message': 'Takva mejl adresa već postoji' });
              }
            }


      
          ZahtevRegistracije.create({ 'korisnickoIme': username, 'lozinka': password, 'ime': ime, 'prezime': prezime, 'adresa': adresa, 'telefon': telefon, 'mejl': mejl, 'odbijen': false }, (err, resp) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ 'message': 'Greška pri registraciji' });
            }
            return res.json({ 'message': 'OK' });
          });
        });
     });
    }


      upload = (req: express.Request, res: express.Response) => {
       // console.log(req.body); 
       // console.log(req.file); 
    
        if (req.file === undefined) {
            
            const imagePath = 'default.jpg';
            const korisnickoIme = req.body.korisnickoIme;
            

            ZahtevRegistracije.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'slika': imagePath } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    return res.json({ 'message': 'Greška na serveru' });
                }
                return res.json({ 'message': 'OK' });
            })
        } else {
            
            const imagePath = (req.file as Express.Multer.File).filename;
            const korisnickoIme = req.body.korisnickoIme;
    
            ZahtevRegistracije.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'slika': imagePath } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    return res.json({ 'message': 'Greška na serveru' });
                }
                return res.json({ 'message': 'OK' });
            })
        }  
    }

    getAll = (req: express.Request, res: express.Response) => {

        ZahtevRegistracije.find({'odbijen': false}, (err, zahtev) => {
            if (err) console.log(err);
            else res.json(zahtev)
        })
    }

    ukloniZahtev = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
    
        ZahtevRegistracije.deleteOne({'korisnickoIme': username }, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
        })
    }

    odbijZahtev = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
    
        ZahtevRegistracije.updateOne({'korisnickoIme': username },{$set:{'odbijen':"true"}}, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
        })
      }


}