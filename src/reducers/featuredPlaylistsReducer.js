import * as ActionTypes from '../utils/constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type) {
        case ActionTypes.ACTION_FETCH_FEATURED_PLAYLISTS:
            return action.payload;
        default:
            return state;
    }
};