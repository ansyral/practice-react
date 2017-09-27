import constants from '../actions/constants';

export const sort = (state = "SORTED_BY_DATE", action) => {
    switch (action.type) {
        case constants.SORT_COLORS:
            return action.sortBy;
        default :
            return state;
    }
}