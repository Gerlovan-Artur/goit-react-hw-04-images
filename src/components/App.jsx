import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getCards } from '../fetchFoto';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    showButton: false,
    page: 1,
    isLoading: false,
    selectedImg: null,
    error: null,
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      getCards(query, page)
        .then(images => {
          images.data.hits.length === 0 && toast.info('Nothing found');

          if (images.data.hits.length >= 12) {
            this.setState({ showButton: true });
          } else this.setState({ showButton: false });

          if (prevState.query !== query) {
            this.setState({ images: [...images.data.hits], isLoading: false });
          } else
            this.setState({
              images: [...prevState.images, ...images.data.hits],
              isLoading: false,
            });
        })
        .catch(error => {
          this.setState({
            error: toast.error('Something wrong, reload the page'),
          });
        });
    }
    <ToastContainer />;
  };

  closeModal = () => {
    this.setState({ selectedImg: null });
  };

  selectImg = imageUrl => {
    this.setState({ selectedImg: imageUrl });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { error, isLoading, selectedImg, showButton } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <p>{error}</p>}
        <ImageGallery images={this.state.images} onSelect={this.selectImg} />
        {isLoading && <Loader />}
        {showButton && <Button onClick={this.loadMoreBtn}></Button>}
        {selectedImg !== null && (
          <Modal url={selectedImg} closeModal={this.closeModal}>
            <img src={selectedImg} alt={selectedImg} />
          </Modal>
        )}
      </>
    );
  }
}