export interface IEvent {
    name: string,
    createdAt?: number,
    startsAt: number,
    endsAt?: number,
    description?: string,
    _id: string
}

export interface EventsState {
    events: IEvent[]
}

export enum EventsActionTypes {
    SET_EVENTS = 'SET_EVENTS',
    ADD_EVENT = 'ADD_EVENT',
    EDIT_EVENT = 'EDIT_EVENT',
    DELETE_EVENT = 'DELETE_EVENT',
    CLEAR_EVENTS = 'CLEAR_EVENTS'
}
interface SetEventsActionInterface {
    type: EventsActionTypes.SET_EVENTS
    payload: IEvent []
}
interface AddEventActionInterface {
    type: EventsActionTypes.ADD_EVENT
    payload: IEvent
}
interface EditEventActionInterface {
    type: EventsActionTypes.EDIT_EVENT
    payload: {
        createdAt: number
        editedTodo: string
    }
}
interface RemoveEventActionInterface {
    type: EventsActionTypes.DELETE_EVENT
    payload: string
}

interface ClearEventsActionInterface {
    type: EventsActionTypes.CLEAR_EVENTS
}


export type EventsAction = AddEventActionInterface | EditEventActionInterface | RemoveEventActionInterface | SetEventsActionInterface | ClearEventsActionInterface