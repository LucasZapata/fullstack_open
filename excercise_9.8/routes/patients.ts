import express from "express";
import {v1 as uuid} from 'uuid';
import { Patient, PatientSafe } from "../types";
import patients from "../patients_DB";
import { parsePatient, parseEntry } from "../util";


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patients as PatientSafe[]);
});

router.get('/:id', (req, res) => {
    const reqPatient = patients.find(p => p.id === req.params.id);
    if (!reqPatient)
        res.sendStatus(404);
    res.send(reqPatient);
});

router.post('/', (req, res) => {
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const parsedData = parsePatient(req.body);
        const newPatient = {...parsedData, id:uuid()} as Patient;
        patients.push(newPatient);
        res.json(newPatient);
    }
    catch (error : unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
});

router.post('/:id/entries', (req,res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry = parseEntry(req.body, uuid());
    let patient = patients.find(p => p.id === req.params.id);
    if (!patient)
        res.sendStatus(404);
    else if (patient?.entries){
        patient?.entries?.push(entry);}
    else{
        patient = {...patient, entries: [entry]};}
    res.send(entry);
});

export default router;