import React from 'react';
import '../css/loading.css';

const Loading = (props) => {
    return (
        <div className={"ui segment " + props.height}> 
            <div className="ui active inverted dimmer">
                <div className="ui small text loader">{props.text}</div>
            </div>
        </div>
    );
}

export default Loading; 