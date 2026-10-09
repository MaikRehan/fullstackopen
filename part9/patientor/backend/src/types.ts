export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export interface DiagnosesEntry {
    code: string,
    name: string,
    latin?: string
}

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: string,
    occupation:string
}

export type PatientsWithoutSsn = Omit<PatientEntry, 'ssn'>;

export type NewPatient = Omit<PatientEntry, 'id'>;