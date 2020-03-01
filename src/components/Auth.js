import React from 'react';
import { encodeQuery } from '../utils/queryString';
import Loading from '../components/Loading';
import * as AuthConstants from '../utils/constants/components/authConstants'

export default class Auth extends React.Component {
    componentDidMount() {
        const url = encodeQuery(AuthConstants.AUTHORIZATION_SPOTIFY_ENDPOINT, {
            client_id: AuthConstants.AUTHORIZATION_SPOTIFY_CLIENT_ID,
            response_type: AuthConstants.AUTHORIZATION_SPOTIFY_RESPONSE_TYPE,
            redirect_uri: AuthConstants.AUTHORIZATION_SPOTIFY_REDIRECT_URI
        });

        window.location.href = url;
    }
    
    render() {
        return (
            <Loading text={AuthConstants.AUTHORIZATION_LOADING_TEXT} height="full-height" />
        );
    }
}