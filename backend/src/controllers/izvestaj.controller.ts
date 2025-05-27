import * as express from 'express';
import Izvestaj from '../models/izvestaj';

export class IzvestajController{

    dodajIzvestaj = (req: express.Request, res: express.Response) => {
        
        let izvestaj= new Izvestaj({
            pacijent: req.body.pacijent,
            lekar: req.body.lekar,
            datumVreme: req.body.datumVreme,
            dijagnoza: req.body.dijagnoza,
            terapija: req.body.terapija,
            razlogDolaska: req.body.razlogDolaska,
            datumKontrole: req.body.datumKontrole
        })
        izvestaj.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':'OK'})
        })
          
    }

    getUsersReports = (req: express.Request, res: express.Response) => {

        let pacijent = req.body.pacijent;

        Izvestaj.find({'pacijent': pacijent}, (err, reports) => {
            if (err) console.log(err);
            else res.json(reports)
        })
    }

    
}