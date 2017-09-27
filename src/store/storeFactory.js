import { createStore, 
    combineReducers, 
    applyMiddleware } from 'redux';
import { colors } from '../reducers/ColorsReducer';
import { sort } from '../reducers/SortReducer';

const logger = store => next => action => {
let result
console.groupCollapsed("dispatching", action.type)
console.log('prev state', store.getState())
console.log('action', action)
result = next(action)
console.log('next state', store.getState())
console.groupEnd()
}

const saver = store => next => action => {
let result = next(action)
localStorage['redux-store'] = JSON.stringify(store.getState())
return result
}

const stateData = {colors:[], sort: 'SORTED_BY_TITLE'};
const storeFactory = (initialState=stateData) =>
applyMiddleware(logger, saver)(createStore)(
   combineReducers({colors, sort}),
   (localStorage['redux-store']) ?
       JSON.parse(localStorage['redux-store']) :
       initialState
)

export default storeFactory