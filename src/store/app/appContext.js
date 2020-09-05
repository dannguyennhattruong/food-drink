import createDataContext from '../createDataContext'
import appReducer from './reducers'
import * as actions from './actions';


const { Provider, Context } = createDataContext(
    appReducer,
    { ...actions},
    {
        theme : 'light',
        info_snackbar : {},
        isHideSideBar :false
    }
)

export { Provider, Context }
