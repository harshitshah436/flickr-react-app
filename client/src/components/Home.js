import React, { Component } from 'react';
import '../styles/home.css';
import axios from 'axios';
import ReactLoading from "react-loading";
import InfiniteScroller from 'react-infinite-scroller';
import Container from '../components/Container';

const key_flickr = "f37e96732f6075d33fc9f734702eaf7d";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      elements: [],
      numberPage: 1,
      isLoading: false
    };
  }

  type = "spokes";
  loadMore(page) {
    setTimeout(() => {
      let url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`
      // let url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${key_flickr}&date=&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
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
      <div className="Explore" >
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
}

export default Home;
