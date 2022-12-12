import { EventsAction, EventsActionTypes } from './../types/events';
import { Dispatch } from 'redux';

import EventService from '../services/EventServices';

export const addEventAsync = (name: string, startsAt: number) => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            const createdAt = new Date().valueOf()
            const response = await EventService.addEvent(name, createdAt, startsAt)
        } catch (e) {
            console.log(e);
        }
    }
}
export const getEventsAsync = () => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            const response = await EventService.getEvents()
            console.log('##',response);
            dispatch({type: EventsActionTypes.SET_EVENTS, payload: response.data})
            
        } catch (e) {
            console.log(e);
            
        }
    }
}