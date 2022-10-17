export enum authPanelActionTypes {
    SHOW_PANEL = 'SHOW_PANEL',
    HIDE_PANEL = 'HIDE_PANEL'
}

export interface authPanelState {
    shown: boolean
}

interface ShowPanelActionInterface {
    type: authPanelActionTypes.SHOW_PANEL
}
interface HidePanelActionInterface {
    type: authPanelActionTypes.HIDE_PANEL
}
export type authPanelAction = ShowPanelActionInterface | HidePanelActionInterface