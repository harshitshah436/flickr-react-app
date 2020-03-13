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
  }

  render() {
    let text = this.getText();
    return (
      <div className="search">
        <div className="sort">
          Sort:
          <button className="btnSort" onClick={this.descByName}>
            Latest
          </button>
          |
          <button className="btnSort" onClick={this.ascByName}>
            Earliest
          </button>
        </div>
        <div className="search-conatainer" >
          <SearchInput value={text} className="search-input" onChange={this.searchUpdated} onKeyUp={(event) => {
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

  searchUpdated = (item) => {
    this.setState({ searchItem: item });
  }

  searchItems = () => {
    if (this.state.searchItem) {
      this.props.history.push('/photos/tags/' + this.state.searchItem);
    } else {
      alert("Please enter the text to search.");
    }
  }

  getText() {
    const url = window.location.href.split('/');
    if (url.length === 6 && url[4] === "tags") {
      return url[5];
    } else if (url.length === 7 && url[4] === "sort") {
      return url[6];
    }
  }

  ascByName = () => {
    this.props.history.push('/photos/sort/asc/' + this.state.searchItem);
  }

  descByName = () => {
    this.props.history.push('/photos/sort/desc/' + this.state.searchItem);
  }
}

export default withRouter(Search);
