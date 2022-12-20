import { EventsAction, EventsActionTypes } from './../types/events';
import { Dispatch } from 'redux';

import EventService from '../services/EventServices';

export const addEventAsync = (name: string, createdAt: number, startsAt: number | null) => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            const response = await EventService.addEvent(name, createdAt, startsAt)
            dispatch({type: EventsActionTypes.ADD_EVENT, payload: response.data})
        } catch (e) {
            console.log(e);
        }
    }
}
export const getEventsAsync = () => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            const response = await EventService.getEvents()
            dispatch({type: EventsActionTypes.SET_EVENTS, payload: response.data})
            
        } catch (e) {
            console.log(e);
            
        }
    }
}
export const deleteEventAsync = (_id: string) => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            await EventService.deleteEvent(_id)
            dispatch({type: EventsActionTypes.DELETE_EVENT, payload: _id})
        } catch (e) {
            console.log(e);
        }
    }
}