import express from 'express';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientEntriesWithoutSsn());
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;