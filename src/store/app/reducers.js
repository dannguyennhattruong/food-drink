import * as types from './types';

const initialState = {
    theme : 'light'
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_THEME_APP:
            return {
                ...state,
                theme : state.theme === 'light'? 'dark' : 'light'
            }
        default:
            return state;
    }
}

export default appReducer;
