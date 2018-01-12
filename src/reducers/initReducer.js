import * as Types from "../actions/actionTypes";

const initialState = {
    listeners:{
        netInfo:null,
        appState:null,
        geolocation:{}
    },
    text:'初始化App',
}

export function initReducer(state = initialState, action){
    switch (action.type){
        case 'listenerNetInfo':
            return {
                ...state,
                listeners:{
                    ...state.listeners,
                    netInfo:action.data
                }
            }
        case 'listenerAppState':
            return {
                ...state,
                listeners:{
                    ...state.listeners,
                    appState:action.data
                }
            }       
        case Types.GetGeolocation:
            return {
                ...state,
                listeners:{
                    ...state.listeners,
                    geolocation:action.data
                }
            }

        default:
        return state;
    }
}