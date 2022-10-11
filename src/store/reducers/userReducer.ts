import { UserState, UserAction, UserActionTypes } from './../../types/user';
import { IUser } from '../../types/IUser';

const initialState: UserState = {
    user: {
        email: '',
        isActivated: false,
        id: '0'
    },
    isAuth: false,
    isLoading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.LOADING:
            return { ...state, isLoading: true}
        case UserActionTypes.ERROR: 
            console.log(action.payload);
            return { ...state, error: action.payload, isLoading: false}
        case UserActionTypes.SET_USER:
            return {error: null, isAuth: true , user: action.payload, isLoading: false}
        case UserActionTypes.LOG_OUT:
            return {...state, isAuth: false , user: {} as IUser}
        default:
            return state
    }
}
