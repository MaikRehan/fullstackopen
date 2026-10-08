import patients from '../../data/patients.ts';
import type {PatientEntry, PatientsWithoutSsn} from "../types.ts";

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

const addDiary = () => {
    return null;
};

export default {
    getEntries,
    addDiary,
    getPatientEntriesWithoutSsn
};