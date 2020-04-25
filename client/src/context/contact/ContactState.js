import React, { useReducer } from 'react';
import { v4 as generateId } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        //Some hard-coded contacts for now
        contacts: [
            {
                id: 1,
                name: 'John Doe',
                email: 'John@gmail.com',
                phone: '03123123',
                type: 'personal'
            },
            {
                id: 2,
                name: 'bron Doe',
                email: 'bron@gmail.com',
                phone: '03123123',
                type: 'personal'
            },
            {
                id: 3,
                name: 'harry Doe',
                email: 'harry@gmail.com',
                phone: '03123123',
                type: 'professional'
            },

        ],
        current: null,
        filtered: null
    };


    const [state, dispatch] = useReducer(contactReducer, initialState);


    //All the actions
    //Add Contact
    const addContact = (contact) => {
        contact.id = generateId();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    //Delete Contact
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }
    //Set current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }


    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }


    //Update Contact
    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };


    //Filter Contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }


    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }



    //Anything that needs to be accessed from other components must be put in 'value' below
    return (
        <ContactContext.Provider

            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}


export default ContactState;

