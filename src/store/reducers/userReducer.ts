import { IUser } from './../../models/IUser';

const UNSET_USER = 'UNSET_USER'
const SET_USER = 'SET_USER'


interface UserState {
    user: IUser
    isAuth: boolean
}

interface UserAction {
    type: string
    payload?: any
}

const initialState: UserState = {
    user: {
        email: '',
        isActivated: false,
        id: '0'
    },
    isAuth: false
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case SET_USER:
            return {isAuth: true , user: action.payload}
        case UNSET_USER:
            return {isAuth: false , user: {} as IUser}
        
        default:
            return state
    }
}