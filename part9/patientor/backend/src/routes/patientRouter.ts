import express, { type Request, type Response} from 'express';
import patientService from '../services/patientService.ts';
import { type NewPatient, type PatientEntry, type Patient} from "../types.ts";
import {newPatientParser, errorMiddleware} from "../middleware.ts";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientEntriesWithoutSsn());
});

router.get('/:id', (req, res) => {
    const patient:Patient = patientService.getPatientById(req.params.id);
    if (patient){
        res.send(patient);
    } else {
        res.sendStatus(404);
    }

});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<PatientEntry>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;