import React from 'react';

const FeaturedPlaylistCard = (props) => {
    return (
        <div className="column">
            <div className="ui raised segment">
                <div className="ui unstackable items">
                    <div className="item">
                        <div className="ui small image">
                            <img src={props.playlist.images[0].url} alt={props.playlist.name} />
                        </div>
                        <div className="content">
                            <h2 className="header">{props.playlist.name}</h2>
                            <div className="meta"></div>
                            <div className="description">
                                <span>{props.playlist.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedPlaylistCard;