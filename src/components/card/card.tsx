import { Card } from '../../types/card.ts';
import RateStarsComponent from '../../rate-stars/rate-stars.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { formatNumberWithSpaces } from '../../utils.ts';

type CardProps = {
  card: Card;
  handleClick: (cardId: number) => void;
  activeClass?: string;
}


function CardComponent({card, handleClick, activeClass}: CardProps): JSX.Element {
  const {id, name, previewImg, price, previewImg2x, previewImgWebp, previewImgWebp2x, rating, reviewCount} = card;

  const imageUrl = {
    previewImgSrcSet: `/${previewImgWebp}, /${previewImgWebp2x}`,
    previewImg2x: `/${previewImg2x} 2x`,
    previewImg: `/${previewImg}`,
  };

  const clickHandler = (cardId: number) => handleClick(cardId);

  return (
    <div className={`product-card ${activeClass ? activeClass : ''}`}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={imageUrl.previewImg}
          />
          <img
            src={imageUrl.previewImg}
            srcSet={imageUrl.previewImg2x }
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <RateStarsComponent rating={rating} reviewCount={reviewCount} />
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatNumberWithSpaces(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          onClick={() => clickHandler(id)}
          className="btn btn--purple product-card__btn"
          type="button"
        >
                      Купить
        </button>
        <Link to={`${AppRoute.Product}/${id}`} className="btn btn--transparent">
                      Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CardComponent;
