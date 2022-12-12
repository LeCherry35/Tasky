import { EventsState, EventsActionTypes, EventsAction } from './../../types/events';
import * as _ from 'lodash'

const initialState: EventsState = {
    events: []
}

export const eventReducer = (state = initialState, action: EventsAction): EventsState => {
    switch (action.type) {
        case EventsActionTypes.SET_EVENTS: 
        console.log('$$$', action.payload);
            return {events: action.payload}
        case EventsActionTypes.ADD_EVENT:
            return { ...state, events: [...state.events , action.payload]}
        default:
            return state
    }
}

// export const addToodoAction = (todo:string, deadline: number, createdAt:number) => {
//     return {type: TodosActionTypes.ADD_TODO, payload: {createdAt: createdAt, deadline, todo: todo, isDone: false}}
// }
