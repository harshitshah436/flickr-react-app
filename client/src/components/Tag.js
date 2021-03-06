import React, { Component } from 'react';
import '../styles/home.css';
import axios from 'axios';
import ReactLoading from "react-loading";
import InfiniteScroller from 'react-infinite-scroller';
import Container from './Container';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      elements: [],
      numberPage: 1,
      isLoading: false,
      text: "",
      display: 'none'
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
          loadMore={this.loadMore.bind()}
          hasMore={this.state.hasMore}
          threshold={50}
          loader={loader}>
          <Container images={images}></Container>
        </InfiniteScroller>
        <div className="loader-no-images" style={{display: this.state.display}}>
          No images found!!<br/>Remove '{this.state.text}' from the searchbox.
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    const text = this.props.match.params.id;
    if (text !== this.state.text) {
      this.setState({
        text,
        elements: [],
        numberPage: 1,
        hasMore: true,
        isLoading: false,
        display: 'none'
      })
    }
  }

  loadMore = () => {
    let page = this.state.numberPage;
    let text = this.props.match.params.id;
    let url = `${process.env.REACT_APP_API_SERVER}/api/flickr/search/${page}/${text}`

    setTimeout(() => {
      axios.get(url)
        .then((res) => {
          if(res.data.photos.photo.length === 0){
            this.setState({display: 'block'})
          }
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

export default Tag;
