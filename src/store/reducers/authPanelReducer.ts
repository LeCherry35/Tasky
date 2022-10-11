import { authPanelAction, authPanelActionTypes, authPanelState } from './../../types/authPanel';
const initialState = {
    shown:false
}

export const authPanelReducer = (state = initialState, action: authPanelAction): authPanelState  => {
    switch (action.type) {
        case authPanelActionTypes.SHOW_PANEL:
            return {shown: true}
        case authPanelActionTypes.HIDE_PANEL:
            return {shown: false}
        default:
            return state
    }
}
export const hidePanel = () => {
    return {type: 'HIDE_PANEL'}
}
export const showPanel = () => {
    return {type: 'SHOW_PANEL'}
}