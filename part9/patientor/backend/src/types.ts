import {z} from "zod";

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

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
});

export type PatientsWithoutSsn = Omit<PatientEntry, 'ssn'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface PatientEntry extends NewPatient {
    id: string,
}