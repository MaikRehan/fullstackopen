import express from 'express';
import utils from '../utils.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientEntriesWithoutSsn());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils.parseNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;