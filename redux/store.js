import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ticketsReducer from './reducers';
const rootReducer = combineReducers({
    ticketsReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));