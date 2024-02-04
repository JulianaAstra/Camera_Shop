import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { getCard } from '../../store/app-data/selectors';
import { fetchCardAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { Card } from '../../types/card';
import { handleOverlayClick } from '../../utils';
import useEscapeBtnClick from '../../hooks/use-escape-btn-click/use-escape-btn-click';

type ModalAddItemProps<T> = {
  cardIdValue: number;
  handleCloseClick: (value?: T) => void;
}

function ModalAddItem({cardIdValue, handleCloseClick}: ModalAddItemProps<number>): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted && cardIdValue !== null) {
      dispatch(fetchCardAction({id: cardIdValue}));
    }
    return () => {
      isMounted = false;
    };
  }, [cardIdValue, dispatch]);

  useEscapeBtnClick(handleCloseClick);

  const card: Card | null = useAppSelector(getCard);

  if (!card) {
    return (
      <LoadingScreen />
    );
  }

  const {name, vendorCode,type, previewImg, level, price, previewImg2x, previewImgWebp, previewImgWebp2x} = card;

  const closeClickHandler = () => handleCloseClick();

  const imageUrl = {
    previewImgSrcSet: `../${previewImgWebp}, ${previewImgWebp2x}`,
    previewImg2x: `../${previewImg2x} 2x`,
    previewImg: `../${previewImg}`,
  };


  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={(evt) => handleOverlayClick(evt, handleCloseClick)}/>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={imageUrl.previewImgSrcSet}
                />
                <img
                  src={imageUrl.previewImg}
                  srcSet={imageUrl.previewImg2x}
                  width={140}
                  height={120}
                  alt={name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} фотокамера</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{price} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
          Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={closeClickHandler}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

export default ModalAddItem;
