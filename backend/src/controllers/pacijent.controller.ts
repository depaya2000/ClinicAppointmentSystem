import * as express from 'express';
import Pacijent from '../models/pacijent'
import Lekar from '../models/lekar'
import ZahtevRegistracije from '../models/zahteviRegistracije'

export class PacijentController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Pacijent.findOne({ 'korisnickoIme': username, 'lozinka': password}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Pacijent.findOne({ 'korisnickoIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {

      Pacijent.find({}, (err, pacijenti) => {
          if (err) console.log(err);
          else res.json(pacijenti)
      })
  }


    updatePhoto = (req: express.Request, res: express.Response) => {
      // console.log(req.body); 
      // console.log(req.file); 
   
       if (req.file === undefined) {
           
           const imagePath = req.body.slika;
           const korisnickoIme = req.body.korisnickoIme;
           //console.log(imagePath)
   
           Pacijent.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'slika': imagePath } }, (err, resp) => {
               if (err) {
                   console.log(err);
                   return res.json({ 'message': 'Greška na serveru' });
               }
               return res.json({ 'message': 'OK' });
           })
       } else {
           
           const imagePath = (req.file as Express.Multer.File).filename;
           const korisnickoIme = req.body.korisnickoIme;
   
           Pacijent.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'slika': imagePath } }, (err, resp) => {
               if (err) {
                   console.log(err);
                   return res.json({ 'message': 'Greška na serveru' });
               }
               return res.json({ 'message': 'OK' });
           })
       }  
   }
    
    changePassword = (req: express.Request, res: express.Response) => {
      let username = req.body.username;
      let newPassword = req.body.newPassword;
      
      Pacijent.updateOne({ 'korisnickoIme': username }, { $set: { 'lozinka': newPassword } }, (err, resp) => {
        if (err) {
            console.log(err);
            return res.json({ 'message': 'Greška na serveru' });
        }
        return res.json({ 'message': 'OK' });
    })
  }

    otkaziPregled = (req: express.Request, res: express.Response) => {
      let username = req.body.username;
      let lekar = req.body.lekar;
      let naziv = req.body.naziv;
      let datum = req.body.datum;
      let vreme = req.body.vreme;

      Pacijent.updateOne({'korisnickoIme': username },{$pull:{'zakazaniPregledi': {'lekarUsername': lekar, 'naziv': naziv, 'datum': datum, 'vreme': vreme}}}, (err, resp) => {
        if (err) {
            console.log(err);
            return res.json({ 'message': 'Greška na serveru' });
        }
        return res.json({ 'message': 'OK' });
      })  
    }

    zakaziPregled = (req: express.Request, res: express.Response) => {
      let username = req.body.pacijentUsername;
      let lekarUsername = req.body.lekarUsername;
      let naziv = req.body.nazivPregleda;
      let datum = req.body.datum;
      let vreme = req.body.vreme;

      Pacijent.updateOne({'korisnickoIme': username },{$push:{'zakazaniPregledi': { 'lekarUsername': lekarUsername, 'naziv': naziv, 'datum': datum, 'vreme': vreme, 'imaIzvestaj': false}}}, (err, resp) => {
        if (err) {
            console.log(err);
            return res.json({ 'message': 'Greška na serveru' });
        }
        return res.json({ 'message': 'OK' });
      })
   }

   dodajIzvestaj = (req: express.Request, res: express.Response) => {
    let username = req.body.pacijent;
    let izvestaj = req.body.izvestaj;

    Pacijent.updateOne({'korisnickoIme': username },{$push:{'izvestaji': izvestaj}}, (err, resp) => {
      if (err) {
          console.log(err);
          return res.json({ 'message': 'Greška na serveru' });
      }
      return res.json({ 'message': 'OK' });
    })
  }

  obrisiPacijenta = (req: express.Request, res: express.Response) => {
    let username = req.body.pacijent;

    Pacijent.deleteOne({'korisnickoIme': username }, (err, resp) => {
      if (err) {
          console.log(err);
          return res.json({ 'message': 'Greška na serveru' });
      }
      return res.json({ 'message': 'OK' });
    })
  }

  izmeniPacijenta = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let adresa = req.body.adresa;
    let telefon = req.body.telefon;
    let mejl = req.body.mejl;

    
    ZahtevRegistracije.findOne({ $and: [{ 'mejl': mejl }, { 'korisnickoIme': { $ne: username } }] }, (err, postojiPacijent) => {
      if (err) {
        console.log(err);
        return res.json({ 'message': 'Greška na serveru' });
      }
      
      if (postojiPacijent) {
        if (postojiPacijent.mejl === mejl && postojiPacijent.korisnickoIme != username) {
           return res.json({ 'message': 'Takva mejl adresa već postoji!' });
        }
      }
      

      Pacijent.findOne({ $and: [{ 'mejl': mejl }, { 'korisnickoIme': { $ne: username } }] }, (err, postojiPacijent) => {
        if (err) {
          console.log(err);
          return res.json({ 'message': 'Greška na serveru' });
        }
    
        if (postojiPacijent) {
          if (postojiPacijent.mejl === mejl && postojiPacijent.korisnickoIme != username) {
            return res.json({ 'message': 'Takva mejl adresa već postoji!' });
          }
        }

        Lekar.findOne({ $and: [{ 'mejl': mejl }, { 'korisnickoIme': { $ne: username } }] }, (err, postojiPacijent) => {
          if (err) {
            console.log(err);
            return res.json({ 'message': 'Greška na serveru' });
          }
      
          if (postojiPacijent) {
            if (postojiPacijent.mejl === mejl && postojiPacijent.korisnickoIme != username) {
              return res.json({ 'message': 'Takva mejl adresa već postoji!' });
            }
          }



    Pacijent.updateOne({'korisnickoIme': username },{$set:{'ime':ime, 'prezime':prezime, 'adresa':adresa, 'telefon': telefon, 'mejl': mejl}}, (err, resp) => {
      if (err) {
          console.log(err);
          return res.json({ 'message': 'Greška na serveru' });
      }
      return res.json({ 'message': 'OK' });
      })
    })
  });
  })
  }

  addUser = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.lozinka;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let adresa = req.body.adresa;
    let telefon = req.body.telefon;
    let mejl = req.body.mejl;
    let slika = req.body.slika;

    Pacijent.create({'korisnickoIme': username, 'lozinka': password, 'ime':ime, 'prezime':prezime, 'adresa':adresa, 'telefon':telefon, 'mejl':mejl, 'slika':slika }, (err, resp) => {
      if (err) {
          console.log(err);
          return res.json({ 'message': 'Greška na serveru' });
      }
      return res.json({ 'message': 'OK' });
    })  
  }


      
}