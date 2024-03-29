import { useParams } from 'react-router-dom';
import { fetchCardAction, fetchSimilarCardsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCard, getCards, getCardsDataLoadingStatus, getSimilarCardsDataLoadingStatus } from '../../store/app-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect, useState, useRef} from 'react';
import { Card } from '../../types/card';
import RateStarsComponent from '../../rate-stars/rate-stars';
import TabsContentComponent from '../../components/tabs-content/tabs-content';
import Page404 from '../page404/404-page';
import SimilarProductsComponent from '../../components/similar-products/similar-products';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import { Reviews } from '../../components/reviews/reviews';
import ScrollToTopBtnComponent from '../../components/scroll-to-top-btn/scroll-to-top-btn';
import { Helmet } from 'react-helmet-async';
import HeaderComponent from '../../components/header/header';
import FooterComponent from '../../components/footer/footer';
import AddReviewModalComponent from '../../components/add-review-modal/add-review-modal';
import useBodyBlock from '../../hooks/use-body-block/use-body-block';
import AddReviewModalSuccessComponent from '../../components/add-review-modal-success/add-review-modal-success';
import { matcehsTabName } from '../../utils';
import { formatNumberWithSpaces } from '../../utils';

function ProductPageComponent(): JSX.Element {

  const [similarCardId, setSimilarCardId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddReviewSuccess, setIsAddReviewSuccess] = useState(false);
  const [isTabUrlValid, setTabUrlValid] = useState(true);

  const {id, tab} = useParams();
  const idNumber = id !== undefined && /^\d+$/.test(id) ? parseInt(id, 10) : undefined;
  const dispatch = useAppDispatch();
  const cards = useAppSelector(getCards);
  const isIdExists = cards?.some((card) => card.id === idNumber);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);
  const isSimilarCardsLoading = useAppSelector(getSimilarCardsDataLoadingStatus);
  const isCardsLoading = useAppSelector(getCardsDataLoadingStatus);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && tab) {
      setTabUrlValid(matcehsTabName(tab));
    }
    return () => {
      isMounted = false;
    };
  }, [tab]);

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
  }, [dispatch, id, idNumber, isIdExists, isAddReviewSuccess]);

  const card: Card | null = useAppSelector(getCard);

  useBodyBlock(similarCardId);
  useBodyBlock(isModalOpen);
  useBodyBlock(isAddReviewSuccess);

  if (!isIdExists || !isTabUrlValid) {
    return (
      <Page404 />
    );
  }

  if (!card || isCardsLoading || isSimilarCardsLoading) {
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

  const handleAddReviewBtnClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <HeaderComponent />
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
                    <span className="visually-hidden">Цена:</span>{formatNumberWithSpaces(price)} ₽
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
          <Reviews
            bottomBoundaryRef={bottomBoundaryRef}
            addReviewBtnClickHandler={handleAddReviewBtnClick}
          />
          {similarCardId &&
          <ModalAddItem cardIdValue={similarCardId}
            handleCloseClick={() => setSimilarCardId(null)}
          /> }
        </div>
        {isModalOpen &&
          <AddReviewModalComponent
            setReviewSuccess={setIsAddReviewSuccess}
            cameraId={cardId}
            handleCloseClick={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
          />}
        {isAddReviewSuccess &&
          <AddReviewModalSuccessComponent
            handleCloseClick={() => setIsAddReviewSuccess(false)}
          />}
      </main>
      <ScrollToTopBtnComponent />
      <FooterComponent bottomBoundaryRef={bottomBoundaryRef}/>
    </div>
  );
}

export default ProductPageComponent;
