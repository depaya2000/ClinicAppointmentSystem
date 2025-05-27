import * as express from 'express';
import Menadzer from '../models/menadzer'

export class MenadzerController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Menadzer.findOne({ 'korisnickoIme': username, 'lozinka': password}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Menadzer.findOne({ 'korisnickoIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let newPassword = req.body.newPassword;
        
        Menadzer.updateOne({ 'korisnickoIme': username }, { $set: { 'lozinka': newPassword } }, (err, resp) => {
          if (err) {
              console.log(err);
              return res.json({ 'message': 'Greška na serveru' });
          }
          return res.json({ 'message': 'OK' });
      })
    }
}