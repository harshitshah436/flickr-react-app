import React, { Component } from 'react';
import Search from '../components/Search.js'
import '../styles/header.css';
import { withRouter } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header" >
        <div className="app-name" onClick={this.goToPageHome.bind()}>
          NASA Flickr
        </div>

        <div className="mssv" >
        </div>

        <div className="search">
          <Search></Search>
        </div>
      </div>
    );
  }

  goToPageHome = () => {
    this.props.history.push('/');
  }
}

export default withRouter(Header);
