import axios from 'axios';
import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/LoadMoreButton';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './App.module.css';

export const App = () => {
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

  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const fetchImages = async (searchValue, page) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39466689-b0058dc694ac3f446d63717a4';

    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${searchValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (!searchValue) {
      return; // Якщо немає значення пошуку не робимо запит
    }
    newFetchImages(searchValue, page);

    async function newFetchImages(searchValue, page) {
      setIsLoading(true);

      try {
        const resp = await fetchImages(searchValue, page);

        if (resp.total === 0) {
          Notify.failure(
            'Вибачте, немає результатів за вашим пошуком. Спробуйте ще раз.'
          );
          setLoadMoreBtn(false); //щоб після великого запиту - а потім де немає резуьтатів не вибивало кнопку лоад море
          return;
        } else {
          if (page === 1) {
            Notify.info('total results: ' + resp.total);
          }
        }

        const loadMore = page < Math.ceil(resp.totalHits / 12);
        if (!loadMore) {
          Notify.success(
            'Кінець списку результатів, всього знайдено:' + resp.total
          );
        }

        setImages(prevImages => [...prevImages, ...resp.hits]);
        setLoadMoreBtn(loadMore);
      } catch (err) {
        Notify.failure(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [searchValue, page]);

  const handleSubmit = async newSearchValue => {
    if (newSearchValue.trim() !== '') {
      if (newSearchValue === searchValue) {
        Notify.warning('Запит ідентичний поточному запиту');
        return;
      }
      setSearchValue(newSearchValue);
      setImages([]);
      setPage(1);
    } else {
      console.log('спочатку введіть запит');
      Notify.warning('Для пошуку введіть запит');
    }
  };
  const loadMoreBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  const handlerOpenModal = modalData => {
    setOpenModal(true);
    setModalData(modalData);
  };

  const handlerCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <div className={css.App}>
        {images && images.length > 0 && (
          <ImageGallery images={images} handlerOpenModal={handlerOpenModal} />
        )}

        {isLoading && <Loader />}

        {openModal && (
          <Modal handlerCloseModal={handlerCloseModal} modalData={modalData} />
        )}
      </div>
      {loadMoreBtn && !isLoading && (
        <LoadMoreButton onClick={loadMoreBtnClick} />
      )}
    </>
  );
};
