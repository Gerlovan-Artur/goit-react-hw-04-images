import propTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { name, largeImageURL, webformatURL },
  onSelect,
}) => {
  return (
    <img
      className={style.imageGalleryItem}
      src={webformatURL}
      alt={name}
      onClick={() => {
        onSelect(largeImageURL);
      }}
    />
  );
};

ImageGalleryItem.propTypes = {
  image: propTypes.object.isRequired,
  onclick: propTypes.func.isRequired,
};