import { useParams } from 'react-router-dom';
import { fetchCardAction, fetchSimilarCardsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCard, getCards} from '../../store/app-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect, useState } from 'react';
import { Card } from '../../types/card';
import RateStarsComponent from '../../rate-stars/rate-stars';
import TabsContentComponent from '../../components/tabs-content/tabs-content';
import Page404 from '../page404/404-page';
import SimilarProductsComponent from '../../components/similar-products/similar-products';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';

function ProductPageComponent(): JSX.Element {
  const [similarCardId, setSimilarCardId] = useState<number | null>(null);
  const {id} = useParams();
  const idNumber = id !== undefined && /^\d+$/.test(id) ? parseInt(id, 10) : undefined;
  const dispatch = useAppDispatch();
  const cards = useAppSelector(getCards);
  const isIdExists = cards?.some((card) => card.id === idNumber);

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

  if (!isIdExists) {
    return (
      <Page404 />
    );
  }

  if (!card) {
    return (
      <LoadingScreen />
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
          <SimilarProductsComponent handleBuyClick={buyBtnClickHandler}/>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">
                Оставить свой отзыв
                  </button>
                </div>
                <ul className="review-block__list">
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Сергей Горский</p>
                      <time className="review-card__data" dateTime="2022-04-13">
                    13 апреля
                      </time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <p className="visually-hidden">Оценка: 5</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list">
                        <span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">
                      Надёжная, хорошо лежит в руке, необычно выглядит
                        </p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">
                      Тяжеловата, сложно найти плёнку
                        </p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">
                      Раз в полгода достаю из-под стекла, стираю пыль, заряжаю —
                      работает как часы. Ни у кого из знакомых такой нет, все
                      завидуют) Теперь это жемчужина моей коллекции, однозначно
                      стоит своих денег!
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Пётр Матросов</p>
                      <time className="review-card__data" dateTime="2022-03-02">
                    2 марта
                      </time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg>
                      <p className="visually-hidden">Оценка: 1</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list">
                        <span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Хорошее пресс-папье</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">
                      Через 3 дня развалилась на куски
                        </p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">
                      При попытке вставить плёнку сломался механизм открытия
                      отсека, пришлось заклеить его изолентой. Начал настраивать
                      фокус&nbsp;— линза провалилась внутрь корпуса. Пока
                      доставал — отломилось несколько лепестков диафрагмы. От
                      злости стукнул камеру об стол, и рукоятка треснула
                      пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу.
                      НЕ РЕКОМЕНДУЮ!!!
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Татьяна Кузнецова </p>
                      <time className="review-card__data" dateTime="2021-12-30">
                    30 декабря
                      </time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-full-star" />
                      </svg>
                      <svg width={17} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg>
                      <p className="visually-hidden">Оценка: 4</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list">
                        <span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Редкая</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Высокая цена</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">
                      Дорого для портативной видеокамеры, но в моей коллекции
                      как раз не хватало такого экземпляра. Следов использования
                      нет, доставили в заводской упаковке, выглядит шикарно!
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">
                Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
          {similarCardId && <ModalAddItem cardIdValue={similarCardId} handleCloseClick={crossBtnClickHandler}/> }
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
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

export default ProductPageComponent;
