import axios from 'axios';
import * as ApiConstants from '../utils/constants/apiConstants';

// Create a base http client instance for Spotify API
export const spotifyApi = (accessToken) => {
    return (
        axios.create({
            baseURL: ApiConstants.API_SPOTIFY_BASE_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
    );
}   