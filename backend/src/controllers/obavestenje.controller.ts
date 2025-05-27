import * as express from 'express';
import Obavestenje from '../models/obavestenje';

export class ObavestenjeController{

    dodajObavestenje = (req: express.Request, res: express.Response) => {
        
        let obavestenje= new Obavestenje({
            pacijent: req.body.pacijent,
            posiljalac: req.body.posiljalac,
            naslov: req.body.naslov,
            tekst: req.body.tekst,
            procitano: false
        })
        obavestenje.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':'OK'})
        })
          
    }

    procitajObavestenje= (req: express.Request, res: express.Response) => {

        let pacijent = req.body.pacijent;
        let posiljalac = req.body.posiljalac;
        let naslov = req.body.naslov;
        let tekst = req.body.tekst;

        Obavestenje.updateOne({'pacijent': pacijent, 'posiljalac': posiljalac, 'naslov': naslov, 'tekst': tekst},{'procitano':true}, (err, reports) => {
            if (err) console.log(err);
            else res.json({ 'message': 'OK' })
        })
    }

    getUsersNotification = (req: express.Request, res: express.Response) => {

        let pacijent = req.body.pacijent;

        Obavestenje.find({'pacijent': pacijent}, (err, reports) => {
            if (err) console.log(err);
            else res.json(reports)
        })
    }

    
}