import React, { Component } from 'react';
import '../styles/home.css';
import axios from 'axios';
import ReactLoading from "react-loading";
import InfiniteScroller from 'react-infinite-scroller';
import Container from './Container';

class SortDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      elements: [],
      numberPage: 1,
      isLoading: false,
      text: ""
    };
  }
  type = "spokes";

  render() {
    const loader =
      <div className="loader" key={0}>
        <ReactLoading type={this.type} color="black" height={100} width={100} />
      </div>

    let images = this.state.elements.map(photo => {
      return {
        src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
        id: photo.id,
        thumbnail: photo.url_z,
        thumbnailWidth: parseInt(photo.width_z),
        thumbnailHeight: parseInt(photo.height_z),
        caption: photo.title,
        ownername: photo.ownername,
        views: photo.views,
      };
    });

    return (
      <div>
        <InfiniteScroller
          className={"main-explore"}
          pageStart={0}
          loadMore={this.loadMore.bind(this)}
          hasMore={this.state.hasMore}
          threshold={50}
          loader={loader}>
          <Container images={images}></Container>
        </InfiniteScroller>
      </div>
    );
  }

  loadMore(page) {
    const text = this.props.match.params.id;
    let url = `${process.env.REACT_APP_API_SERVER}/api/flickr/sort/desc/${page}/${text}`;
    setTimeout(() => {
      axios.get(url)
        .then((res) => {
          this.setState({
            elements: this.state.elements.concat(res.data.photos.photo),
            numberPage: res.data.photos.page + 1,
            hasMore: this.state.numberPage < res.data.photos.pages ? true : false,
            isLoading: true,
          })
        })
    }, 0);
  }
}

export default SortDesc;
