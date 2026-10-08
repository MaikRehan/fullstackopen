export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export interface DiagnosesEntry {
    code: string,
    name: string,
    latin?: string
}

export type DiagnosesWithoutLatin = Omit<DiagnosesEntry, 'latin'>;