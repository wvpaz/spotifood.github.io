import axios from 'axios';
import * as ApiConstants from '../utils/constants/apiConstants';

// Create a base http client instance for Filter API
export default axios.create({
    baseURL: ApiConstants.API_FILTER_BASE_URL
});