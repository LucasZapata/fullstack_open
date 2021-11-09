import { Gender, NewPatient, Entry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from './types';

type Fields = {name:unknown, dateOfBirth:unknown, ssn:unknown, gender:unknown, occupation:unknown, entries?:unknown};

export const parsePatient = ({name, dateOfBirth, ssn, gender, occupation, entries}: Fields):NewPatient => {
    const newPatient:NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };

    return newPatient;
};

export const parseEntry = (entry:any, id:string): Entry => {
    console.log('1');
    switch (entry.type){
        case "Hospital":{
            let newEntry:HospitalEntry = {
                id:id,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: entry.type,
                description: parseString(entry.description),
                date: parseString(entry.date),
                specialist: parseString(entry.specialist)
            };
            if (entry.diagnosisCodes){
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                newEntry = {...newEntry, diagnosisCodes: entry.diagnosisCodes};
            }
            if (entry.discharge){
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                newEntry = {...newEntry, discharge: entry.discharge};
            }
            return newEntry;
        }
        case "OccupationalHealthcare":{
            console.log('1');
            let newEntry:OccupationalHealthcareEntry = {
                id:id,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: entry.type,
                description: parseString(entry.description),
                date: parseString(entry.date),
                specialist: parseString(entry.specialist),
                employerName: parseString(entry.employerName)
                };
                if (entry.sickLeave)
                newEntry = {...newEntry, sickLeave: parseSickLeave(entry.sickLeave)};
            console.log('1');
            return newEntry;
        }
        case "HealthCheck":{
            const newEntry:HealthCheckEntry = {
                id:id,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: entry.type,
                description: parseString(entry.description),
                date: parseString(entry.date),
                specialist: parseString(entry.specialist),
                healthCheckRating: parseRating(entry.healthCheckRating)
                };
                return newEntry;
        }
        default: {
            throw new Error("incorrect entry");
        }
    }
};

const isString = (text:unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isGender = (text:any): text is Gender =>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(text);
};

//const isEntry = (entry:any): entry is Entry => true;

const parseName = (name:unknown): string => {
    if (!name || !isString(name))
        return("Incorrect or missing name");
    return name;
};

const parseDate = (date:unknown): string => {
    if (!date || !isString(date))
        return("Incorrect or missing date");
    return date;
};

const parseSsn = (ssn:unknown): string => {
    if (!ssn || !isString(ssn))
        return("Incorrect or missing ssn");
    return ssn;
};

const parseGender = (value:unknown): Gender => {
    if (!value || !isGender(value))
        throw new Error("Incorrect or missing gender");
    return value;
};

const parseOccupation = (name:unknown): string => {
    if (!name || !isString(name))
        return("Incorrect or missing occupation");
    return name;
};

const parseEntries = (entries:unknown): Entry[] => {
    /* if (!Array.isArray(entries && entries !== null))
        throw new Error("Incorrect or missing entries"); */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries as Entry[];
};

const parseSickLeave = (data:any):{startDate:string, endDate:string} => {
    try{
        parseString(data.startDate);
        parseString(data.endDate);
    }catch (e) {console.log(e);}
    return {
        startDate: parseString(data.startDate),
        endDate: parseString(data.endDate)
    };
};

const isRating = (value:any): value is HealthCheckRating =>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(value);
};

const parseRating = (data:any):HealthCheckRating => {
    if (!data || !isRating(data))
        throw new Error("Incorrect or missing health chekc rating");
    return data;
};

const parseString = (value:unknown): string => {
    if (!value || !isString(value))
        throw new Error("Incorrect or missing value");
    return value;
};