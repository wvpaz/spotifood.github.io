import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchFilterData, fetchFeaturedPlaylists } from '../actions';
import Loading from '../components/Loading';
import { Redirect } from "react-router-dom";
import * as FilterConstants from '../utils/constants/components/filterConstants';
import * as RegexConstants from '../utils/constants/regexConstants';

class Filter extends Component {

    state = { 
        dateFormat: RegexConstants.REGEX_TIMESTAMP,
        validTimestamp: true,
        validLimit: true,
        validOffset: true,
        unauthorized: false,
        country: '',
        locale: '',
        timestamp: '',
        limit: 20,
        offset: 0
     };

    componentDidMount() {
        this.props.fetchFilterData();
        this.getFeaturedPlaylists();

        this.intervalId = setInterval(() => {
            this.getFeaturedPlaylists();
        }, FilterConstants.TIME_INTERVAL_TO_REFRESH);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    getFeaturedPlaylists = () => {

        const filter = {...this.mapStateToFilter()};
        const validForm = this.formValidation(filter);

        if(validForm) {
            this.props.fetchFeaturedPlaylists(filter).catch((error) => 
            {
                if (error.response.status === 401) {
                    this.setState({ unauthorized: true });
                } 
            });
        }
    }

    mapStateToFilter = () => {
        const filter = {
            country: this.state.country,
            locale: this.state.locale,
            timestamp: this.state.timestamp,
            limit: this.state.limit,
            offset: this.state.offset
        }

        return filter;
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        this.getFeaturedPlaylists();
    }

    formValidation = (filter) => {
        const regex = new RegExp(this.state.dateFormat);
        const validTimestamp = regex.test(filter.timestamp) || filter.timestamp === '';
        const validLimit = (filter.limit > 0 && filter.limit <= 50) || filter.limit === '';
        const validOffset = (filter.offset >= 0) || filter.offset === '';

        this.setState({
            validTimestamp,
            validLimit,
            validOffset
        });

        return validLimit && validOffset && validTimestamp;
    }

    buildFieldsObject = () => {
        let fields = {};
        
        this.props.filter.map(item => {
            return fields[item.id] = { ...item };
        });

        return fields;
    }

    render() {
        if(this.state.unauthorized) {
            this.setState({ unauthorized: false });
            return <Redirect to="/auth" />
        }

        if(!this.props.filter.length){
            return(<Loading text={FilterConstants.FILTER_LOADING_TEXT} height="small-height" />);
        }

        let fields = this.buildFieldsObject();

        return (
            <div className="ui segment app--full-background-color">
                <h2>Filter</h2>
                <form onSubmit={this.submitForm} className="ui form">
                    <div className="fields">
                        <div className="eight wide field">
                            <label>{fields.country.name}</label>
                            <select className="ui dropdown" name='country' onChange={this.onInputChange}>
                                <option value=''>{fields.country.name}</option>
                                { 
                                    fields.country.values.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.name}</option>
                                        );
                                    }) 
                                }
                            </select>
                        </div>
                        <div className="eight wide field">
                            <label>{fields.locale.name}</label>
                            <select className="ui dropdown" name='locale' onChange={this.onInputChange}>
                                <option value=''>{fields.locale.name}</option>
                                { 
                                    fields.locale.values.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.name}</option>
                                        );
                                    }) 
                                }
                            </select>
                        </div>
                    </div>
                    <div className="fields">
                        <div className={this.state.validTimestamp ? 'eight wide field' : 'eight wide field error'}>
                            <label>{fields.timestamp.name}</label>
                            <div className="ui input">
                                <input type="text" name='timestamp' onChange={this.onInputChange} placeholder={fields.timestamp.name} />
                            </div>
                        </div>
                        <div className={this.state.validLimit ? 'four wide field' : 'four wide field error'}>
                            <label>{fields.limit.name}</label>
                            <div className="ui input">
                                <input type="number" name='limit' onChange={this.onInputChange} placeholder={fields.limit.name} />
                            </div>
                        </div>
                        <div className={this.state.validOffset ? 'four wide field' : 'four wide field error'}>
                            <label>{fields.offset.name}</label>
                            <div className="ui input">
                                <input type="number" name='offset' onChange={this.onInputChange} placeholder={fields.offset.name} />
                            </div>
                        </div>
                    </div>
                    <div className="wide app--align-right app--bottom-align app--submit-container">
                        <button className="ui button app--button app--primary-button app--border-button" type="submit">FILTER</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
}

export default connect(mapStateToProps, { fetchFilterData, fetchFeaturedPlaylists })(Filter);