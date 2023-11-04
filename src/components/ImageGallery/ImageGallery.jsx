import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGalery.module.css';

export const ImageGallery = ({ images, handlerOpenModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          handlerOpenModal={handlerOpenModal}
        />
      ))}
    </ul>
  );
};
