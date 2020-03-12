import React, {Component} from 'react';
import Search from '../components/Search.js'
import '../styles/header.css';
import {withRouter} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    goToPageExplorer(){
        this.props.history.push('/explore');
    }

    goToPageHome(){
        this.props.history.push('/');
    }

    render() {
        return ( 
            <div className = "header" >
                <div className = "app-name" onClick={this.goToPageHome.bind(this)}> 
                    NASA Flickr 
                </div> 

                {/* <a className = "explore" onClick={this.goToPageExplorer.bind(this)}>
                    Explore
                </a>  */}

                <div className = "mssv" >
                </div> 

                <div className="search">
                    <Search></Search>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
