import React, { Component } from 'react';
import SearchInput from 'react-search-input'
import '../styles/search.css';
import { withRouter } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: '',
    }
    this.searchUpdated = this.searchUpdated.bind(this);
    this.searchItems = this.searchItems.bind(this);
  }

  searchUpdated(item) {
    this.setState({ searchItem: item });
  }

  searchItems() {
    if (this.state.searchItem) {
      this.props.history.push('/photos/tags/' + this.state.searchItem);
    } else {
      alert("Please enter the text to search.");
    }
  }

  render() {
    return (
      <div className="search">
        <div className="search-conatainer" >
          <SearchInput className="search-input" onChange={this.searchUpdated} onKeyUp={(event) => {
            if (event.key === 'Enter') {
              this.searchItems();
            }
          }} />
        </div>
        <button className="btnSearch" onClick={this.searchItems}>
          <img src={process.env.PUBLIC_URL + '/search.png'} />
        </button>
      </div>
    );
  }
}

export default withRouter(Search);
