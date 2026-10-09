import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients.ts';
import type { PatientEntry, PatientsWithoutSsn, NewPatient } from "../types.ts";

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getPatientEntriesWithoutSsn = (): PatientsWithoutSsn[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patient
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient,
    getPatientEntriesWithoutSsn
};