import React, { Component } from "react";
import Filter from "./Filter";
import FeaturedPlaylists from "./FeaturedPlaylists";
import Logo from '../images/logo.png';

export default class Home extends Component {
  render() {
    return (
      <div className="ui container app--full-height">
        <div className="ui basic center aligned segment app--header">
            <img src={Logo} alt="Spotifood" height="100" />
        </div>
        <Filter />
        <FeaturedPlaylists />
        <br />
      </div>
    );
  }
}