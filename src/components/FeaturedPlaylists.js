import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeaturedPlaylists, fetchAuthorization } from '../actions';
import Loading from '../components/Loading';
import FeaturedPlaylistCard from './FeaturedPlaylistItem';
import * as PlaylistsConstants from '../utils/constants/components/featuredPlaylistsConstants';
import store from '../store';

class FeaturedPlaylists extends Component {
    state = { 
        playlists: [],
        term: '' 
    };

    // componentDidMount() {
    //     console.log("DID: ");
    //     console.log(store.getState());
    // }

    // componentWillReceiveProps(){
    //     console.log("WILL RECEIVE: ");
    //     console.log(store.getState());
    // }

    filterPlaylists = () => {
        let playlists = [...this.props.playlists.items];

        const filteredPLaylists = playlists.filter((playlist) => {
            return playlist.name.toLowerCase().indexOf(this.state.term) >= 0;
        })

        return filteredPLaylists;
    }

    render() {

        if(!this.props.playlists.items) {
           return (<Loading text={PlaylistsConstants.FEATURED_PLAYLISTS_LOADING_TEXT} height="medium-height" />);
        }
        
        const playlists = this.filterPlaylists();

        return (
            <div className="ui segment app--full-background-color">
                <h2>Featured Playlists</h2>
                <br />
                <div className="ui fluid big icon input">
                    <input 
                        type="text" 
                        value={this.state.term}
                        onChange={(event) => {this.setState({term: event.target.value})}}
                        placeholder={PlaylistsConstants.FEATURED_PLAYLISTS_INPUT_SEARCH} />
                    <i className="search icon app--icon-primary-color"></i>
                </div>
                <br />
                <div className="ui two column stackable grid">
                    {
                        playlists.map((item) => {
                            return (
                                <FeaturedPlaylistCard key={item.id} playlist={item} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        filter: state.filter,
        playlists: state.playlists,
        authorization: state.authorization
    }
}

export default connect(mapStateToProps, { fetchFeaturedPlaylists, fetchAuthorization })(FeaturedPlaylists);