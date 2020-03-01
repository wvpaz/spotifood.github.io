import filterApi from '../apis/filterApi';
import { spotifyApi } from '../apis/spotifyApi';
import * as ActionConstants from '../utils/constants/actionsConstants';
import * as ActionTypes from '../utils/constants/actionTypes';
import { buildParameters } from '../utils/helpers/httpHelper';

export const fetchFilterData = () => async dispatch => {
    const response = await filterApi.get(ActionConstants.FILTER_GET_DATA_ENDPOINT);

    dispatch({ type: ActionTypes.ACTION_FETCH_FILTER_DATA, payload: response.data.filters });
}

export const fetchFeaturedPlaylists = (filter) => async (dispatch, getState) => {
    const token = getState().authorization.access_token;
    const axios = spotifyApi(token);
    const params = buildParameters(filter);

    const response = await axios.get(ActionConstants.FEATURED_PLAYLISTS_GET_DATA_ENDPOINT, {
        params
    });

    dispatch({ type: ActionTypes.ACTION_FETCH_FEATURED_PLAYLISTS, payload: response.data.playlists })
}

export const fetchAuthorization = query => dispatch => {
    dispatch({ type: ActionTypes.ACTION_FETCH_AUTHORIZATION_CODE, payload: query });
}