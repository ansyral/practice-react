import constants from '../actions/constants';
import {color} from './ColorReducer';

export const colors = (state=[], action) => {
    switch (action.type) {
        case constants.ADD_COLOR:
            return [
                ...state,
                color({}, action),
            ];
        case constants.REMOVE_COLOR:
            return state.filter(c => c.id !== action.id);
        case constants.RATE_COLOR:
            return state.map(c => color(c, action));
        default:
            return state;
    }
}