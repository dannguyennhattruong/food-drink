import * as types from './types';

const initialState = {
    theme : 'light',
    info_snackbar : {},
    isHideSideBar : false
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_THEME_APP:
            return {
                ...state,
                theme : state.theme === 'light'? 'dark' : 'light'
            }
        case types.SHOW_SNACKBAR:
            return {
                ...state,
                info_snackbar : action.payload
            }
        case types.CLEAR_SNACKBAR:
            return {
                ...state,
                info_snackbar : {}
            }
        case types.TOOGLE_SIDE_BAR:
            return {
                ...state,
                isHideSideBar : !state.isHideSideBar
            }
        default:
            return state;
    }
}

export default appReducer;
