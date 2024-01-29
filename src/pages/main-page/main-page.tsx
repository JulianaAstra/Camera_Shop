import CardsListComponent from '../../components/cards-list/cards-list.tsx';
import { Card } from '../../types/card.ts';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector.ts';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import { getCardsDataLoadingStatus, getCards, getPromoCards, getPromoCardsDataLoadingStatus} from '../../store/app-data/selectors.ts';
// import PaginationComponent from '../../components/pagination/pagination.tsx';
import { useState } from 'react';
// import { usePagination } from '../../components/pagination/pagination-context.tsx';
// import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner.tsx';
import { PromoCard } from '../../types/promo-card.ts';
import ModalAddItem from '../../components/modal-add-item/modal-add-item.tsx';

function MainPageComponent(): JSX.Element {

  // const { setCurrentPage, currentPage } = usePagination();
  // const { pageNumber }: { pageNumber?: string } = useParams();
  const [cardId, setCardId] = useState<number | null>(null);

  // useEffect(() => {
  //   if (!pageNumber) {
  //     setCurrentPage(1);
  //     return;
  //   }
  //   const pageNumberAsNumber = parseInt(pageNumber, 10);
  //   if (!isNaN(pageNumberAsNumber)) {
  //     setCurrentPage(pageNumberAsNumber);
  //   }
  // }, [setCurrentPage, pageNumber]);

  const isCardsLoading = useAppSelector(getCardsDataLoadingStatus);
  const isPromoCardsLoading = useAppSelector(getPromoCardsDataLoadingStatus);

  const cards: Card[] | null = useAppSelector(getCards);
  const promoCards: PromoCard[] | null = useAppSelector(getPromoCards);

  if (isCardsLoading || isPromoCardsLoading || cards === null || promoCards === null) {
    return (
      <LoadingScreen />
    );
  }

  // const itemsPerPage = 9;
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const displayedCards = cards.slice(startIndex, endIndex);
  // const pagesCount = Math.ceil(cards.length / itemsPerPage);

  const buyBtnClickHandler = (cardIdValue: number | null) => {
    if (cardIdValue !== null) {
      setCardId(cardIdValue);
    }
  };

  const crossBtnClickHandler = () => {
    setCardId(null);
  };

  return (

    <div className="wrapper">
      <Helmet>
        <title>Camera Shop</title>
      </Helmet>
      <header className="header" id="header">
        <div className="container">
          <a
            className="header__logo"
            href="index.html"
            aria-label="Переход на главную"
          >
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo" />
            </svg>
          </a>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <a className="main-nav__link" href="catalog.html">
              Каталог
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
              Гарантии
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
              Доставка
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
              О компании
                </a>
              </li>
            </ul>
          </nav>
          <div className="form-search">
            <form>
              <label>
                <svg
                  className="form-search__icon"
                  width={16}
                  height={16}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-lens" />
                </svg>
                <input
                  className="form-search__input"
                  type="text"
                  autoComplete="off"
                  placeholder="Поиск по сайту"
                />
              </label>
              <ul className="form-search__select-list">
                <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 8i
                </li>
                <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 7i
                </li>
                <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 6i
                </li>
                <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 5i
                </li>
                <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 4i
                </li>
              </ul>
            </form>
            <button className="form-search__reset" type="reset">
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
              <span className="visually-hidden">Сбросить поиск</span>
            </button>
          </div>
          <a className="header__basket-link" href="#">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
          </a>
        </div>
      </header>
      <main>
        <Banner promoCards={promoCards}/>

        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от" />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="priceUp"
                                placeholder="до"
                              />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="photocamera"
                              defaultChecked
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Фотокамера
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="videocamera" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Видеокамера
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="digital"
                              defaultChecked
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film" disabled />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Плёночная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Моментальная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="collection"
                              defaultChecked
                              disabled
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Коллекционная
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero" defaultChecked/>
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Любительский
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                          Профессиональный
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <button
                        className="btn catalog-filter__reset-btn"
                        type="reset"
                      >
                    Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input
                              type="radio"
                              id="sortPrice"
                              name="sort"
                              defaultChecked
                            />
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort" />
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input
                              type="radio"
                              id="up"
                              name="sort-icon"
                              defaultChecked
                              aria-label="По возрастанию"
                            />
                            <label htmlFor="up">
                              <svg width={16} height={14} aria-hidden="true">
                                <use xlinkHref="#icon-sort" />
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input
                              type="radio"
                              id="down"
                              name="sort-icon"
                              aria-label="По убыванию"
                            />
                            <label htmlFor="down">
                              <svg width={16} height={14} aria-hidden="true">
                                <use xlinkHref="#icon-sort" />
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <CardsListComponent handleBuyBtnClick={buyBtnClickHandler} cards={cards} />
                  {/* <PaginationComponent pagesCount={pagesCount}/> */}
                </div>
              </div>
            </div>
          </section>
        </div>

        {cardId && <ModalAddItem cardIdValue={cardId} handleCloseClick={crossBtnClickHandler}/> }
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__info">
            <a
              className="footer__logo"
              href="index.html"
              aria-label="Переход на главную"
            >
              <svg width={100} height={36} aria-hidden="true">
                <use xlinkHref="#icon-logo-mono" />
              </svg>
            </a>
            <p className="footer__description">
          Интернет-магазин фото- и видеотехники
            </p>
            <ul className="social">
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу вконтатке"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-vk" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу pinterest"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-pinterest" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу reddit"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-reddit" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <p className="footer__title">Навигация</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                Каталог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                Гарантии
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                Доставка
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                О компании
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Ресурсы</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                Курсы операторов
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                Блог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                Сообщество
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Поддержка</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                FAQ
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                Задать вопрос
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </footer>
    </div>

  );
}

export default MainPageComponent;
