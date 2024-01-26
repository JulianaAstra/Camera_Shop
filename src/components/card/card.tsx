import { Card } from '../../types/card.ts';
import RateStarsComponent from '../../rate-stars/rate-stars.tsx';

type CardProps = {
  card: Card;
  handleClick: (cardId: number) => void;
}

function CardComponent({card, handleClick}: CardProps): JSX.Element {
  const {id, name, previewImg, price, previewImg2x, previewImgWebp, previewImgWebp2x, rating, reviewCount} = card;

  const clickHandler = (cardId) => handleClick(cardId);

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
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
          <span className="visually-hidden">Цена:</span>{price}
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
        <a className="btn btn--transparent" href="#">
                      Подробнее
        </a>
      </div>
    </div>
  );
}

export default CardComponent;
