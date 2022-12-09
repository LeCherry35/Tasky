import { Dispatch } from 'redux';

import EventService from '../services/EventServices';
import { EventssAction } from '../types/events';

export const addEventAsync = (name: string, startsAt: number) => {
    return async (dispatch: Dispatch<EventssAction>) => {
        try {
            console.log('g$$$$$$$k', startsAt);
            const createdAt = new Date().valueOf()
            const response = await EventService.addEvent(name, createdAt, startsAt)
        } catch (e) {
            console.log(e);
        }
    }
}