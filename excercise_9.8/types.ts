export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
  }
 
export interface HospitalEntry extends BaseEntry {
    type:"Hospital",
    discharge?:object
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type:"OccupationalHealthcare"
    employerName:string;
    sickLeave?: {startDate:string, endDate:string}
}

export interface HealthCheckEntry extends BaseEntry {
    type:"HealthCheck";
    healthCheckRating:HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnosis {
    code:string;
    name:string;
    latin?:string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[];
}

export type PatientSafe = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewEntry = Omit<Entry, "id">;