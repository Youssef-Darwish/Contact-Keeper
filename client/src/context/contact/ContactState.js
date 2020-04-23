import React, { useReducer } from 'react';
import uuid from 'uuid';
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

        ]
    };


    const [state, dispatch] = useReducer(contactReducer, initialState);


    //All the actions

    //Add Contact


    //Delete Contact


    //Set current Contact


    //Clear Current Contact


    //Update Contact


    //Filter Contacts


    //Clear Filter



    //Anything that needs to be accessed from other components must be put in 'value' below
    return (
        <ContactContext.Provider

            value={{
                contacts: state.contacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )



}


export default ContactState;

