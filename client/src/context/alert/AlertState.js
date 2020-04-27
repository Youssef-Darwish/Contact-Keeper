import React, { useReducer } from 'react';
import AlertContext from '../alert/alertContext';
import alertReducer from '../alert/alertReducer';
import { v4 as generateId } from 'uuid';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = [

    ];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //Set Alert

    const setAlert = (msg, type, timeout = 5000) => {

        const id = generateId();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, timeout);
    };

    //Anything that needs to be accessed from other components must be put in 'value' below
    return (
        <AlertContext.Provider

            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;

