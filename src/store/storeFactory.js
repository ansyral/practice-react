import { createStore, 
    combineReducers, 
    applyMiddleware } from 'redux';
import { colors } from '../reducers/ColorsReducer';
import { sort } from '../reducers/SortReducer';
import thunk from 'redux-thunk';

const clientLogger = store => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
}

const serverLogger = store => next => action => {
    console.log('\n  dispatching server action\n');
    console.log(action);
    console.log('\n');
    return next(action);
}

const middleware = server => [
    (server) ? serverLogger : clientLogger,
    thunk
];

const stateData = {colors:[], sort: 'SORTED_BY_TITLE'};
const storeFactory = (server=false, initialState=stateData) =>
applyMiddleware(...middleware(server))(createStore)(
   combineReducers({colors, sort}),
   initialState     
)

export default storeFactory