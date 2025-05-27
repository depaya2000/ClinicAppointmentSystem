import * as express from 'express';
import Lekar from '../models/lekar'
import Pacijent from '../models/pacijent'
import ZahtevRegistracije from '../models/zahteviRegistracije'

export class LekarController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Lekar.findOne({ 'korisnickoIme': username, 'lozinka': password}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getDoctor = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Lekar.findOne({ 'korisnickoIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getAllDoctors = (req: express.Request, res: express.Response) => {

        Lekar.find({}, (err, lekari) => {
            if (err) console.log(err);
            else res.json(lekari)
        })
    }

    otkaziPregled = (req: express.Request, res: express.Response) => {
        let lekarUsername = req.body.lekarUsername;
        let naziv = req.body.naziv;
        let datum = req.body.datum;
        let vreme = req.body.vreme;
  
        Lekar.updateOne({ 'korisnickoIme': lekarUsername },{$pull:{'zakazaniPregledi': {'naziv': naziv, 'datum': datum, 'vreme': vreme}}}, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
      })   
    }

    zakaziPregled = (req: express.Request, res: express.Response) => {
        let lekarUsername = req.body.lekarUsername;
        let naziv = req.body.nazivPregleda;
        let datum = req.body.datum;
        let vreme = req.body.vreme;
        let pacijent = req.body.pacijent;

  
        Lekar.updateOne({'korisnickoIme': lekarUsername },{$push:{'zakazaniPregledi': {'naziv': naziv, 'datum': datum, 'vreme': vreme, 'pacijent': pacijent, 'imaIzvestaj': false}}}, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
        })
     }

     obrisiLekara = (req: express.Request, res: express.Response) => {
        let username = req.body.lekar;
    
        Lekar.deleteOne({'korisnickoIme': username }, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
        })
      }

      updatePhoto = (req: express.Request, res: express.Response) => {
        // console.log(req.body); 
        // console.log(req.file); 
     
         if (req.file === undefined) {
             
             const imagePath = req.body.slika;
             const korisnickoIme = req.body.korisnickoIme;
             //console.log(imagePath)
     
             Lekar.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'profilnaSlika': imagePath } }, (err, resp) => {
                 if (err) {
                     console.log(err);
                     return res.json({ 'message': 'Greška na serveru' });
                 }
                 return res.json({ 'message': 'OK' });
             })
         } else {
             
             const imagePath = (req.file as Express.Multer.File).filename;
             const korisnickoIme = req.body.korisnickoIme;
     
             Lekar.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'profilnaSlika': imagePath } }, (err, resp) => {
                 if (err) {
                     console.log(err);
                     return res.json({ 'message': 'Greška na serveru' });
                 }
                 return res.json({ 'message': 'OK' });
             })
         }  
     }

     izmeniLekara = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let mejl = req.body.mejl;
        let brojLicence = req.body.brojLicence;
        let specijalizacija = req.body.specijalizacija;
        let ogranak = req.body.ogranak;

        
        Lekar.findOne({ $and: [{ 'mejl': mejl }, { 'korisnickoIme': { $ne: username } }] }, (err, postojiLekar) => {
            if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
            }
        
            if (postojiLekar) {
              if (postojiLekar.mejl === mejl) {
                return res.json({ 'message': 'Takva mejl adresa već postoji!' });
              }

            }

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
    
        Lekar.updateOne({'korisnickoIme': username },{$set:{'ime':ime, 'prezime':prezime, 'adresa':adresa, 'telefon': telefon, 'mejl': mejl, 'brojLicence':brojLicence, 'specijalizacija':specijalizacija, 'ogranak':ogranak}}, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
        })
        });
        })
    });
    }

    registerDoctor = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let mejl = req.body.mejl;
        let brojLicence = req.body.brojLicence;
        let specijalizacija = req.body.specijalizacija;
        let ogranak = req.body.ogranak;
      
        
        Lekar.findOne({ $or: [{ 'korisnickoIme': username }, { 'mejl': mejl }] }, (err, postojiLekar) => {
          if (err) {
            console.log(err);
            return res.json({ 'message': 'Greška na serveru' });
          }
      
          if (postojiLekar) {
            if (postojiLekar.korisnickoIme === username) {
              return res.json({ 'message': 'Takvo korisničko ime već postoji' });
            }
      
            if (postojiLekar.mejl === mejl) {
              return res.json({ 'message': 'Takva mejl adresa već postoji' });
            }
          }
      
          Lekar.create({ 'korisnickoIme': username, 'lozinka': password, 'ime': ime, 'prezime': prezime, 'adresa': adresa, 'telefon': telefon, 'mejl': mejl, 'specijalizacija': specijalizacija, 'brojLicence': brojLicence, 'ogranak':ogranak }, (err, resp) => {
            if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška pri registraciji' });
            }
            return res.json({ 'message': 'OK' });
          });
        });
      }

    upload = (req: express.Request, res: express.Response) => {
        // console.log(req.body); 
        // console.log(req.file); 
     
         if (req.file === undefined) {
             
             const imagePath = 'default.jpg';
             const korisnickoIme = req.body.korisnickoIme;
             //console.log(imagePath)
     
             Lekar.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'profilnaSlika': imagePath } }, (err, resp) => {
                 if (err) {
                     console.log(err);
                     return res.json({ 'message': 'Greška na serveru' });
                 }
                 return res.json({ 'message': 'OK' });
             })
         } else {
             
             const imagePath = (req.file as Express.Multer.File).filename;
             const korisnickoIme = req.body.korisnickoIme;
     
             Lekar.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'profilnaSlika': imagePath } }, (err, resp) => {
                 if (err) {
                     console.log(err);
                     return res.json({ 'message': 'Greška na serveru' });
                 }
                 return res.json({ 'message': 'OK' });
             })
         }  
     }

     dodajSvePreglede = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let pregledi = req.body.pregledi;
  
        Lekar.updateOne({'korisnickoIme': username },{$set:{'sviPregledi': pregledi}}, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
        })
     }

     izmeniSvePreglede = (req: express.Request, res: express.Response) => {
      let specijalizacija = req.body.specijalizacija;
      let pregledi = req.body.pregledi;

      pregledi.forEach(pregled=>{
        Lekar.updateOne(
          { 'specijalizacija': specijalizacija, 'sviPregledi': { $elemMatch: { 'naziv': pregled.naziv } } },
          { $set: { 'sviPregledi.$.cena': pregled.cena, 'sviPregledi.$.trajanje': pregled.trajanje } },
          (err, resp) => {
              if (err) {
                  console.log(err);
                  return res.json({ 'message': 'Greška na serveru' });
              }
              
          }
      );
      })
      return res.json({ 'message': 'OK' });
     }  

     changePassword = (req: express.Request, res: express.Response) => {
      let username = req.body.username;
      let newPassword = req.body.newPassword;
      
      Lekar.updateOne({ 'korisnickoIme': username }, { $set: { 'lozinka': newPassword } }, (err, resp) => {
        if (err) {
            console.log(err);
            return res.json({ 'message': 'Greška na serveru' });
        }
        return res.json({ 'message': 'OK' });
    })
  }

  dodajIzvestaj = (req: express.Request, res: express.Response) => {
    let username = req.body.lekar;
    let nazivPregleda = req.body.naziv;
    let datum = req.body.datum;
    let vreme = req.body.vreme;
    let pacijent = req.body.pacijent;
    
    Lekar.updateOne(
        { 'korisnickoIme': username, 'zakazaniPregledi': { $elemMatch: { 'naziv': nazivPregleda, 'datum': datum, 'vreme': vreme, 'pacijent': pacijent } } },
        { $set: { 'zakazaniPregledi.$.imaIzvestaj': true } },
        (err, resp) => {
            if (err) {
                console.log(err);
                return res.json({ 'message': 'Greška na serveru' });
            }
            return res.json({ 'message': 'OK' });
        }
    );
}

  


}