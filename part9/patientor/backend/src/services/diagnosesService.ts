import diagnoses from '../../data/diagnoses.ts';
import type { DiagnosesEntry } from "../types.ts";

const getEntries = (): DiagnosesEntry[] => {
    return diagnoses;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getEntries,
    addDiagnoses,
};