import { EventsState, EventsActionTypes, EventsAction } from '../../types/events';

const initialState: EventsState = {
    events: []
}

export const eventReducer = (state = initialState, action: EventsAction): EventsState => {
    switch (action.type) {
        case EventsActionTypes.SET_EVENTS:
            return {events: action.payload.sort((a,b) => a.startsAt - b.startsAt)}
        case EventsActionTypes.ADD_EVENT:
            return { ...state, events: [...state.events , action.payload].sort((a,b) => a.startsAt - b.startsAt)}
        case EventsActionTypes.CLEAR_EVENTS:
            return {events: []}
        default:
            return state
    }
}

export const addEventAction = (name: string, createdAt: number, startsAt: number) => {
    return {type: EventsActionTypes.ADD_EVENT, payload: {name, createdAt, startsAt}}
}

export const clearEventsAction = () => {
    return {type: EventsActionTypes.CLEAR_EVENTS}
}