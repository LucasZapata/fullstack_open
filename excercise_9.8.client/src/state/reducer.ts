import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_SINGLE_PATIENT":
      return {
        ...state,
        patientSingle : action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]) => {
  return { type: "SET_PATIENT_LIST", payload: data } as Action;
};

export const setSinglePatient = (data: Patient) => {
  return {type: "SET_SINGLE_PATIENT", payload: data} as Action;
};

export const addPatient = (data: Patient) => {
  return {type: "ADD_PATIENT", payload: data} as Action;
};
