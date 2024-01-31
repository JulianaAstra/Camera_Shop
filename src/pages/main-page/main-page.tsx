import CardsListComponent from '../../components/cards-list/cards-list.tsx';
import { Card } from '../../types/card.ts';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector.ts';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import { getCardsDataLoadingStatus, getCards, getPromoCards, getPromoCardsDataLoadingStatus} from '../../store/app-data/selectors.ts';
import PaginationComponent from '../../components/pagination/pagination.tsx';
import { useState, useEffect } from 'react';
import { usePagination } from '../../components/pagination/pagination-context.tsx';
import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner.tsx';
import { PromoCard } from '../../types/promo-card.ts';
import ModalAddItem from '../../components/modal-add-item/modal-add-item.tsx';
import HeaderComponent from '../../components/header/header.tsx';
import FooterComponent from '../../components/footer/footer.tsx';

function MainPageComponent(): JSX.Element {

  const { setCurrentPage, currentPage } = usePagination();
  const { pageNumber }: { pageNumber?: string } = useParams();
  const [cardId, setCardId] = useState<number | null>(null);

  const isCardsLoading = useAppSelector(getCardsDataLoadingStatus);
  const isPromoCardsLoading = useAppSelector(getPromoCardsDataLoadingStatus);

  const cards: Card[] | null = useAppSelector(getCards);
  const promoCards: PromoCard[] | null = useAppSelector(getPromoCards);

  const itemsPerPage = 9;
  const pagesCount = cards !== null ? Math.ceil(cards.length / itemsPerPage) : 0;

  useEffect(() => {

    if (!pageNumber) {
      setCurrentPage(1);
      return;
    }
    const pageNumberAsNumber = parseInt(pageNumber, 10);
    if (!isNaN(pageNumberAsNumber)) {
      setCurrentPage(pageNumberAsNumber);
    }
  }, [setCurrentPage, pageNumber]);

  useEffect(() => {
    if(cardId !== null) {
      document.body.classList.add('modal-open');
      return () => {
        document.body.classList.remove('modal-open');
      };
    }
  }, [cardId]);

  if (isCardsLoading || isPromoCardsLoading || cards === null || promoCards === null) {
    return (
      <LoadingScreen />
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCards = cards.slice(startIndex, endIndex);

  const buyBtnClickHandler = (cardIdValue: number | null) => {
    if (cardIdValue !== null) {
      setCardId(cardIdValue);
    }
  };

  const crossBtnClickHandler = () => {
    setCardId(null);
  };

  return (

    <div className={`wrapper ${cardId ? 'modal-open' : ''}`}>
      <Helmet>
        <title>Camera Shop</title>
      </Helmet>
      <HeaderComponent />
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
                  <CardsListComponent
                    handleBuyBtnClick={buyBtnClickHandler}
                    cards={displayedCards}
                  />
                  <PaginationComponent pagesCount={pagesCount}/>
                </div>
              </div>
            </div>
          </section>
        </div>

        {cardId &&
        <ModalAddItem cardIdValue={cardId}
          handleCloseClick={crossBtnClickHandler}
        /> }
      </main>
      <FooterComponent />
    </div>
  );
}

export default MainPageComponent;
