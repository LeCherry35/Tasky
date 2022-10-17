import { clearTodos } from './../store/reducers/todoReducer';
import { UserActionTypes, UserAction } from '../types/user';
import { Dispatch } from "redux"
import AuthService from "../services/AuthServises"

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOADING})
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: UserActionTypes.SET_USER, payload: response.data.user})
        } catch (e: any) {
            dispatch({type: UserActionTypes.ERROR, payload: e.response?.data?.message})
        }
    }
}
export const register = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOADING})
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: UserActionTypes.SET_USER, payload: response.data.user}) 
        } catch (e: any) {
            dispatch({type: UserActionTypes.ERROR, payload: e.response?.data?.message})
        }    
    }
}
export const logout = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            dispatch({type: UserActionTypes.LOG_OUT})
            clearTodos()
        } catch (e: any) {
            dispatch({type: UserActionTypes.ERROR, payload: e.response?.data?.message})
        }
    }
}
export const checkAuth = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await AuthService.checkAuth()
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: UserActionTypes.SET_USER, payload: response.data.user})
        } catch (e:any) {
            dispatch({type: UserActionTypes.ERROR, payload: e.response?.data?.message})
        } 
    }
  }