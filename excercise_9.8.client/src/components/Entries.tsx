import React from "react";
import { Entry } from "../types";

const Entries = (entries:Entry[]) => {
    if (entries === [])
        return(<div></div>);
    return (
        <div><h2>Entries</h2>
            <ul>
                {entries.map(entry => <li key={entry.id}>{entry.date} {entry.description} {entry.diagnosisCodes}</li>)}
            </ul>
        </div>
);};

export default Entries;