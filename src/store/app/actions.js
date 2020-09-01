import * as types from './types';

export const change__theme__app = dispatch => () => {
    dispatch(
        {
            type: types.CHANGE_THEME_APP
        }
    )
}