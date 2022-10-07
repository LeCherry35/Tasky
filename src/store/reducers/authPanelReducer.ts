const SHOW_PANEL = 'SHOW_PANEL'
const HIDE_PANEL = 'HIDE_PANEL'

const initialState = {
    shown:false
}

interface authPanelState {
    shown: boolean
}

interface authPanelAction {
    type:string
    payload: any
}
export const authPanelReducer = (state = initialState, action: authPanelAction): authPanelState  => {
    switch (action.type) {
        case SHOW_PANEL:
            return {shown: true}
        case HIDE_PANEL:
            return {shown: false}
        default:
            return state
    }
}