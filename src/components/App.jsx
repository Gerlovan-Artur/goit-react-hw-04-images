import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { getCards } from '../fetchFoto';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = prevQuery => {
    if (prevQuery === query) {
      return toast.warn(
        'Please, enter something else or click the download button'
      );
    }
    setPage(1);
    setImages([]);
    setQuery(prevQuery);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    
    getCards(query, page)
      .then(images => {
        images.data.hits.length === 0 && toast.info('Nothing found');

        if (images.data.hits.length >= 12) {
          setShowButton(true);
        } else setShowButton(false);
        setIsLoading(false);
        setImages(prevImages => [...prevImages, ...images.data.hits]);
      })
      .catch(error => {
        setError(toast.error('Something wrong, reload the page'));
      });

    <ToastContainer />;
  }, [query, page]);

  const closeModal = () => {
    setSelectedImg(null);
  };

  const selectImg = imageUrl => {
    setSelectedImg(imageUrl);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p>{error}</p>}
      <ImageGallery images={images} onSelect={selectImg} />
      {isLoading && <Loader />}
      {showButton && <Button onClick={loadMoreBtn}></Button>}
      {selectedImg !== null && (
        <Modal selectedImg={selectedImg} closeModal={closeModal}></Modal>
      )}
    </>
  );
}