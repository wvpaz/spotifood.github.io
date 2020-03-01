import React from 'react';
import { connect } from 'react-redux';
import { fetchAuthorization } from '../actions';
import { decodeQuery } from '../utils/queryString';
import Loading from '../components/Loading';
import { Redirect } from "react-router-dom";
import * as CallbackConstants from '../utils/constants/components/callbackConstants'

class Callback extends React.Component {
    componentDidMount() {
        const authorization = decodeQuery(this.props.location.hash);
        this.props.fetchAuthorization(authorization);
    }

    render() {
        if(!this.props.authorization){
            return(<Loading text={CallbackConstants.CALLBACK_LOADING_TEXT} height="full-height" />);
        }

        return <Redirect to="/home" />
    }
}

const mapStateToProps = (state) => {
    return {
        authorization: state.authorization
    };
}

export default connect(mapStateToProps, { fetchAuthorization })(Callback);