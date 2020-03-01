import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import featuredPlaylistsReducer from './featuredPlaylistsReducer';
import authReducer from './authReducer';

export default combineReducers ({  
    filter: filterReducer,
    playlists: featuredPlaylistsReducer,
    authorization: authReducer
});