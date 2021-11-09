import React from 'react';
import { Modal, } from 'semantic-ui-react';
import { NewEntry } from '../types';
import EntryForm from "./EntryForm";

interface Props {
    open: boolean;
    close: () => void;
    onSubmit: (values: NewEntry) => void;
    //error?: string;
  }

const AddEntryModal = ({open, close, onSubmit}:Props) => {
    return (
        <Modal open={open} onClose={close} centered={false} onSubmit={onSubmit} closeIcon>
            <Modal.Content>
                <EntryForm onSubmit={onSubmit}/>
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;