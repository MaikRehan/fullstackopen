import diagnoses from '../../data/diagnoses.ts';
import type { DiagnosesEntry } from "../types.ts";

const getEntries = (): DiagnosesEntry[] => {
    return diagnoses;
};

const addDiary = () => {
    return null;
};

export default {
    getEntries,
    addDiary,
};