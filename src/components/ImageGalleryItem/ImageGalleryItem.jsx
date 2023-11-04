import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  handlerOpenModal,
  largeImageURL,
}) => {
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={() =>
          handlerOpenModal({
            largeImageURL: largeImageURL,
            tags: tags,
          })
        }
      />
    </li>
  );
};
