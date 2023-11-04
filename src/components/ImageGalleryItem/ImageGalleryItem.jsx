import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.ImageGalleryItem} key={this.props.id}>
        <img
          className={css.ImageGalleryItemImage}
          src={this.props.webformatURL}
          alt={this.props.tags}
          loading="lazy"
          onClick={() =>
            this.props.handlerOpenModal({
              largeImageURL: this.props.largeImageURL,
              tags: this.props.tags,
            })
          }
        />
      </li>
    );
  }
}
