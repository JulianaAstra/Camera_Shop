import { useParams } from 'react-router-dom';
import { fetchCardAction, fetchSimilarCardsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCard, getCards } from '../../store/app-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect, useState, useRef } from 'react';
import { Card } from '../../types/card';
import RateStarsComponent from '../../rate-stars/rate-stars';
import TabsContentComponent from '../../components/tabs-content/tabs-content';
import Page404 from '../page404/404-page';
import SimilarProductsComponent from '../../components/similar-products/similar-products';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import { Reviews } from '../../components/reviews/reviews';
import ScrollToTopBtnComponent from '../../components/scroll-to-top-btn/scroll-to-top-btn';
import { Helmet } from 'react-helmet-async';

function ProductPageComponent(): JSX.Element {

  const [similarCardId, setSimilarCardId] = useState<number | null>(null);
  const {id} = useParams();
  const idNumber = id !== undefined && /^\d+$/.test(id) ? parseInt(id, 10) : undefined;
  const dispatch = useAppDispatch();
  const cards = useAppSelector(getCards);
  const isIdExists = cards?.some((card) => card.id === idNumber);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && id !== null) {
      if (!isIdExists) {
        return;
      }
      dispatch(fetchCardAction({id: idNumber as number}));
      dispatch(fetchSimilarCardsAction({id: idNumber as number}));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id, idNumber, isIdExists]);

  const card: Card | null = useAppSelector(getCard);

  if (!card) {
    return (
      <LoadingScreen />
    );
  }

  if (!isIdExists) {
    return (
      <Page404 />
    );
  }

  const {name, rating, reviewCount, category, description, vendorCode, type, previewImg, previewImgWebp, previewImgWebp2x, level, price, previewImg2x} = card;
  const cardId = card.id;

  const buyBtnClickHandler = (cardIdValue: number | null) => {
    if (cardIdValue !== null) {
      setSimilarCardId(cardIdValue);
    }
  };

  const crossBtnClickHandler = () => {
    setSimilarCardId(null);
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>{name}</title>
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
            <span className="header__basket-count">3</span>
          </a>
        </div>
      </header>
      <main>
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
                  <a className="breadcrumbs__link" href="catalog.html">
                Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x}`}
                    />
                    <img
                      src={`../../${previewImg}`}
                      srcSet={`../../${previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <RateStarsComponent rating={rating} reviewCount={reviewCount}/>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{price} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                Добавить в корзину
                  </button>

                  <TabsContentComponent
                    vendorCode={vendorCode}
                    category={category}
                    type={type}
                    level={level}
                    description={description}
                    id={cardId}
                  />

                </div>
              </div>
            </section>
          </div>
          <SimilarProductsComponent
            cardId={cardId}
            handleBuyClick={buyBtnClickHandler}
          />
          <Reviews bottomBoundaryRef={bottomBoundaryRef}/>
          {similarCardId &&
          <ModalAddItem cardIdValue={similarCardId}
            handleCloseClick={crossBtnClickHandler}
          /> }
        </div>
      </main>
      <ScrollToTopBtnComponent />

      <footer
        className="footer"
      >
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
        <div ref={bottomBoundaryRef} />
      </footer>
    </div>
  );
}

export default ProductPageComponent;
