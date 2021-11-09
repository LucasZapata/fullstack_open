import React, { useState } from 'react';
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from '../state';
import { NewEntry } from "../types";
import {DiagnosisSelection, TextField, NumberField} from "../AddPatientModal/FormField";

enum Types {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
}

interface Props {
    onSubmit: (values: NewEntry) => void;
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

const EntryForm = ({onSubmit}:Props) => {
    const [entryType, setEntryType] = useState(Types.Hospital);
    const [{diagnoses}] = useStateValue();

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.value;
        switch (type) {
            case Types.Hospital:
                setEntryType(Types.Hospital);
                break;
            case Types.OccupationalHealthcare:
                setEntryType(Types.OccupationalHealthcare);
                break;
            case Types.HealthCheck:
                setEntryType(Types.HealthCheck);
                break;
        }
    };

    return (
        <Formik
            /* initialValues = {{
                type: "HospitalEntry",
                description: "",
                date: "",
                specialist: "",
                employerName: "",
                healthCheckRating: 0
            }} */
            initialValues = {{
                type: "Hospital",
                description: "TEST",
                date: "1/1/1",
                specialist: "Tester",
                employerName: "Me",
                healthCheckRating: 0
            }}
            onSubmit = {onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                  errors.description = requiredError;
                }
                if (!values.date) {
                  errors.date = requiredError;
                }
                if (!values.specialist) {
                  errors.specialist = requiredError;
                }
                if ((entryType === Types.OccupationalHealthcare) && !values.employerName) {
                  errors.employerName = requiredError;
                }
                return errors;
              }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (<Form className={"form ui"}>
            <Field as="select" name="type" onChange={(e:React.ChangeEvent<HTMLInputElement>) => {changeType(e);
                setFieldValue("type", e.target.value);}}>
                <option value={Types.Hospital}>Hospital</option>
                <option value={Types.OccupationalHealthcare}>Occupational</option>
                <option value={Types.HealthCheck}>Health check</option>
                </Field>
            <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
            <Field
                label="Date"
                placeholder="Date"
                name="date"
                component={TextField}
                />
            <Field
                label="Specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
                />
            <Field
                label="Discharge"
                placeholder="Discharge"
                name="discharge"
                disable={entryType !== Types.Hospital}
                component={TextField}
                />
            <Field
                label="Employer"
                placeholder="Employer"
                name="employerName"
                disable={entryType !== Types.OccupationalHealthcare}
                component={TextField}
                />
            <Field
                label="Sick leave"
                placeholder="Sick leave"
                name="sickLeave"
                disable={entryType !== Types.OccupationalHealthcare}
                component={TextField}
                />
            <Field
                label="healthCheckRating"
                name="healthCheckRating"
                disable={entryType !== Types.HealthCheck}
                component={NumberField}
                min={0}
                max={3}
            />
            <Field
                label="diagnosis"
                placeholder="Diagnosis"
                name="Diagnosis"
                disable={entryType !== Types.HealthCheck}
                component={TextField}
                />
            {/* <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            /> */}
            <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!isValid}
                >
                  Add
                </Button>
            </Form>);}}
        </Formik>
    );

};

export default EntryForm;