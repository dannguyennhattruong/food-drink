import * as types from './types';

export const change__theme__app = dispatch => () => {
    dispatch(
        {
            type: types.CHANGE_THEME_APP
        }
    )
}

export const show__snackbar = dispatch => (info) => {
    dispatch({
        type : types.SHOW_SNACKBAR,
        payload: info
    })
}
export const clear__snackbar = dispatch => () => {
    dispatch({
        type : types.CLEAR_SNACKBAR,
    })
}

export const toggle_sidebar = dispatch => () => {
    dispatch({
        type : types.TOOGLE_SIDE_BAR,
    })
}