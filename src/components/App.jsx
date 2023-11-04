import axios from 'axios';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/LoadMoreButton';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './App.module.css';

export class App extends Component {
  state = {
    images: null,
    searchValue: '',
    page: 1,
    isLoading: false,
    loadMoreBtn: false,
    openModal: false,
    modalData: null,
  };

  fetchImages = async (searchValue, page) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39466689-b0058dc694ac3f446d63717a4';

    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${searchValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  componentDidUpdate(_, prevState) {
    Notify.init({
      position: 'center-top', // Позиція по центру
      width: '500px', // Ширина сповіщення
      distance: '200px', // Відстань від тіла
      opacity: 0.95, // Прозорість
      borderRadius: '10px', // Радіус кутів
      timeout: 2500, // Таймаут
      showOnlyTheLastOne: true, // Показувати лише останнє сповіщення
      fontAwesomeIconSize: '70px', // Розмір FontAwesome іконок
      fontSize: '28px', // Розмір шрифта тексту
      cssAnimation: true, // Використовувати CSS анімації
      cssAnimationDuration: 500, // Тривалість CSS анімацій
    });

    const { page, searchValue, images } = this.state;

    const valueChanged = prevState.searchValue !== searchValue;
    const pageChanged = prevState.page !== page;
    const imagesClearedAndNewSearch =
      prevState.images !== images && images.length === 0;

    if (valueChanged || pageChanged || imagesClearedAndNewSearch) {
      this.setState({ isLoading: true });
      this.fetchImages(searchValue, page)
        .then(resp => {
          if (resp.total === 0) {
            console.log(
              'Вибачте, немає результатів за вашим пошуком. Спробуйте ще раз.'
            );
            Notify.failure(
              'Вибачте, немає результатів за вашим пошуком. Спробуйте ще раз.'
            );

            this.setState({ loadMoreBtn: false });
          } else {
            if (page === 1) {
              console.log('total results: ' + resp.total);
              Notify.info('total results: ' + resp.total);
            }

            const loadMore = page < Math.ceil(resp.totalHits / 12);
            if (!loadMore) {
              console.log('Кінець списку результатів');
              Notify.success(
                'Кінець списку результатів, всього знайдено:' + resp.total
              );
            }

            this.setState(prevState => ({
              images: [...prevState.images, ...resp.hits],
              loadMoreBtn: loadMore,
            }));
          }
        })
        .catch(err => {
          console.log(err);
          Notify.failure(err);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = async searchValue => {
    if (searchValue.trim() !== '') {
      this.setState({ searchValue, images: [], page: 1 });
    } else {
      console.log('спочатку введіть запит');
      Notify.warning('Для пошуку введіть запит');
    }
  };
  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handlerOpenModal = modalData => {
    this.setState({ openModal: true, modalData });
  };

  handlerCloseModal = () => {
    this.setState({ openModal: false, modalData: null });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <div className={css.App}>
          {this.state.images && this.state.images.length > 0 && (
            <ImageGallery
              images={this.state.images}
              handlerOpenModal={this.handlerOpenModal}
            />
          )}

          {this.state.isLoading && <Loader />}

          {this.state.openModal && (
            <Modal
              handlerCloseModal={this.handlerCloseModal}
              modalData={this.state.modalData}
            />
          )}
        </div>
        {this.state.loadMoreBtn && !this.state.isLoading && (
          <LoadMoreButton onClick={this.loadMoreBtn} />
        )}
      </>
    );
  }
}
