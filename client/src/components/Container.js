import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import { withRouter } from "react-router-dom";
import '../styles/item.css';
class Container extends Component {
  constructor(props) {
    super(props);
    this.onClickThumbnail = this.onClickThumbnail.bind(this);
  }

  render() {
    var images = this.props.images.map((image) => {
      image.customOverlay = (
        <div className="footer">
          <div className="info">
            <div className="title">
              {image.caption}
            </div>

            <div className="owner-name">
              {image.ownername}
            </div>
          </div>

          <div className="info-view">
            <div className="icon-view">
              <img src={process.env.PUBLIC_URL + '/view.png'} alt=""></img>
            </div>
            <div className="number-view">
              {image.views}
            </div>
          </div>
        </div>
      );
      return image;
    });

    return (
      <div>
        <Gallery
          images={images}
          backdropClosesModal={true}
          enableImageSelection={false}
          rowHeight={280}
          onClickThumbnail={this.onClickThumbnail}
        />
      </div>
    );
  }

  onClickThumbnail(index) {
    var images = this.props.images;
    var image = images[index];
    this.props.history.push('/photos/' + image.id);
  }
}

export default withRouter(Container);
