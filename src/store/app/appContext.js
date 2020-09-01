import createDataContext from '../createDataContext'
import appReducer from './reducers'
import { change__theme__app } from './actions';


const { Provider, Context } = createDataContext(
    appReducer,
    { change__theme__app},
    {
        theme : 'light'
    }
)

export { Provider, Context }
