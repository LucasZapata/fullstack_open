type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface HospitalEntry extends BaseEntry {
  type:"Hospital"
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type:"OccupationalHealthcare"
  employerName:string;
  sickLeave?: {starDate:string, endDate:string}
}

export interface HealthCheckEntry extends BaseEntry {
  type:"HealthCheck";
  healthCheckRating:HealthCheckRating;
}

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

export interface NewEntry extends Omit<HospitalEntry, "type" | "id">, Omit<OccupationalHealthcareEntry, "type" | "id">, Omit<HealthCheckEntry, "type" | "id"> {type:string}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[];
}
