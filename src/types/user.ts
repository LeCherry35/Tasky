import { IUser } from './IUser';

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    LOG_OUT = 'LOG_OUT',
    LOADING = 'LOADING',
    ERROR = 'ERROR'
}

export interface UserState {
    user: IUser
    isAuth: boolean
    isLoading: boolean
    error: null | string
}

interface LoadingActionInterface {
    type: UserActionTypes.LOADING
}

interface AuthErrorActionInterface {
    type: UserActionTypes.ERROR
    payload: string
}

interface SetUserActionInterface {
    type: UserActionTypes.SET_USER
    payload: IUser
}

interface LogoutActionInterface {
    type: UserActionTypes.LOG_OUT
}
export type UserAction  = LoadingActionInterface | AuthErrorActionInterface | SetUserActionInterface | 
    LogoutActionInterface