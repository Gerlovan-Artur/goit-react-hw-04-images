import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';
import style from './ImageGallery.module.css';

export const ImageGallery = ({ images, onSelect }) => {
  return (
    <>
      {images.length > 0 && (
        <div className={style.imageGalleryDiv}>
          <ul className={style.imageGallery}>
            {images.map(image => {
              return (
                <li key={image.id}>
                  <ImageGalleryItem image={image} onSelect={onSelect} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    })
  ),
  onImageClick: propTypes.func.isRequired,
};