import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { Patient, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { setSinglePatient } from "../state";
import AddEntryModal from "../AddEntryModal/AddEntryModal";

const SinglePatient = () => {
    const [{patientSingle}, dispatch] = useStateValue();
    const {id} = useParams<{id?:string}>();
    const [entryModalOpen, setEntryModal] = React.useState<boolean>(false);
    if (!id) return (<div></div>);
    if (patientSingle?.id !== id) {
        axios.get(`${apiBaseUrl}/patients/${id}`).
        then(response => 
            dispatch(setSinglePatient(response.data as Patient))).
        catch(e => console.log(e));
    }

    const openEntryModal = () => {
        setEntryModal(true);
        console.log(entryModalOpen);
    };

    const closeEntryModal = () => {
        setEntryModal(false);
    };

    const submitEntry = async(entry: NewEntry) => {
        try{
        await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            entry
          );}
        catch (e) {
            console.error(e.response?.data || 'Unknown Error');
        }
    };
    
    if (!patientSingle) return (<div></div>);

    return (
        <div>
            <p><b>Name: </b>{patientSingle?.name}</p>
            <p><b>Gender: </b>{patientSingle?.gender}</p>
            <p><b>Occupation: </b>{patientSingle?.occupation}</p>
            <p><b>Date of Birth: </b>{patientSingle?.dateOfBirth}</p>
            <p><b>SSN: </b>{patientSingle?.ssn}</p>
            <div><h2>Entries</h2>
            <ul>
                {patientSingle.entries.map(entry => <li key={entry.id}>{entry.date} {entry.description} {entry.diagnosisCodes}</li>)}
            </ul>
            <button onClick={openEntryModal}>Add new entry</button>
            <AddEntryModal open={entryModalOpen} close={closeEntryModal} onSubmit={submitEntry}/>
        </div>
        </div>);
};

export default SinglePatient;