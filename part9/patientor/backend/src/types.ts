export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

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